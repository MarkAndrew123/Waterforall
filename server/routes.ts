import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaterProjectSchema, insertWaterStatisticsSchema, insertGalleryImageSchema, insertStorySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Water Projects
  app.get("/api/water-projects", async (_req, res) => {
    const projects = await storage.getWaterProjects();
    res.json(projects);
  });

  app.post("/api/water-projects", async (req, res) => {
    const parsed = insertWaterProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const project = await storage.createWaterProject(parsed.data);
    res.json(project);
  });

  // Water Statistics
  app.get("/api/water-statistics", async (req, res) => {
    const category = req.query.category as string;
    if (category) {
      const stats = await storage.getWaterStatisticsByCategory(category);
      res.json(stats);
    } else {
      const stats = await storage.getWaterStatistics();
      res.json(stats);
    }
  });

  app.post("/api/water-statistics", async (req, res) => {
    const parsed = insertWaterStatisticsSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const stats = await storage.createWaterStatistics(parsed.data);
    res.json(stats);
  });

  // Gallery Images
  app.get("/api/gallery-images", async (req, res) => {
    const category = req.query.category as string;
    if (category) {
      const images = await storage.getGalleryImagesByCategory(category);
      res.json(images);
    } else {
      const images = await storage.getGalleryImages();
      res.json(images);
    }
  });

  app.post("/api/gallery-images", async (req, res) => {
    const parsed = insertGalleryImageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const image = await storage.createGalleryImage(parsed.data);
    res.json(image);
  });

  // Community Stories ("Tell Your Story")
  app.get("/api/stories", async (_req, res) => {
    const stories = await storage.getStories();
    res.json(stories);
  });

  app.post("/api/stories", async (req, res) => {
    const parsed = insertStorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const story = await storage.createStory(parsed.data);
    res.json(story);
  });

  const httpServer = createServer(app);
  return httpServer;
}
