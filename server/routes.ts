import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaterProjectSchema, insertWaterStatisticsSchema, insertGalleryImageSchema } from "@shared/schema";
import multer from "multer";
import * as XLSX from "xlsx";

const upload = multer({ dest: "uploads/" });

export async function registerRoutes(app: Express): Promise<Server> {
  // Water Projects Routes
  app.get("/api/water-projects", async (req, res) => {
    try {
      const projects = await storage.getWaterProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch water projects" });
    }
  });

  app.get("/api/water-projects/:id", async (req, res) => {
    try {
      const project = await storage.getWaterProject(parseInt(req.params.id));
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch water project" });
    }
  });

  app.post("/api/water-projects", async (req, res) => {
    try {
      const validatedData = insertWaterProjectSchema.parse(req.body);
      const project = await storage.createWaterProject(validatedData);
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  // Water Statistics Routes
  app.get("/api/water-statistics", async (req, res) => {
    try {
      const { category } = req.query;
      let statistics;
      
      if (category && typeof category === "string") {
        statistics = await storage.getWaterStatisticsByCategory(category);
      } else {
        statistics = await storage.getWaterStatistics();
      }
      
      res.json(statistics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch water statistics" });
    }
  });

  app.post("/api/water-statistics", async (req, res) => {
    try {
      const validatedData = insertWaterStatisticsSchema.parse(req.body);
      const statistics = await storage.createWaterStatistics(validatedData);
      res.json(statistics);
    } catch (error) {
      res.status(400).json({ error: "Invalid statistics data" });
    }
  });

  // Gallery Images Routes
  app.get("/api/gallery-images", async (req, res) => {
    try {
      const { category } = req.query;
      let images;
      
      if (category && typeof category === "string") {
        images = await storage.getGalleryImagesByCategory(category);
      } else {
        images = await storage.getGalleryImages();
      }
      
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery-images", async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(validatedData);
      res.json(image);
    } catch (error) {
      res.status(400).json({ error: "Invalid image data" });
    }
  });

  // Excel Upload Route
  app.post("/api/upload-excel", upload.single("excel"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Process the Excel data and save to storage
      const processedStats = [];
      for (const row of jsonData) {
        const stats = {
          category: row.Category || "general",
          value: parseInt(row.Value) || 0,
          label: row.Label || "Unnamed Statistic",
          year: parseInt(row.Year) || new Date().getFullYear(),
          region: row.Region || null,
        };
        processedStats.push(stats);
      }

      const savedStats = await storage.bulkCreateWaterStatistics(processedStats);
      
      res.json({ 
        message: "Excel file processed successfully",
        recordsProcessed: savedStats.length,
        data: savedStats
      });
    } catch (error) {
      console.error("Excel processing error:", error);
      res.status(500).json({ error: "Failed to process Excel file" });
    }
  });

  // Dashboard Analytics Route
  app.get("/api/dashboard-analytics", async (req, res) => {
    try {
      const [projects, statistics, images] = await Promise.all([
        storage.getWaterProjects(),
        storage.getWaterStatistics(),
        storage.getGalleryImages()
      ]);

      const analytics = {
        totalProjects: projects.length,
        totalPeopleServed: projects.reduce((sum, p) => sum + p.peopleServed, 0),
        activeProjects: projects.filter(p => p.status === "Active").length,
        completedProjects: projects.filter(p => p.completion === 100).length,
        statistics: statistics,
        recentProjects: projects.slice(0, 5),
        galleryCount: images.length,
      };

      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
