import express from "express";
import serverless from "serverless-http";
import { storage } from "../../server/storage";
import { insertWaterProjectSchema, insertWaterStatisticsSchema, insertGalleryImageSchema } from "../../shared/schema";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Water Projects Routes
app.get("/api/water-projects", async (_req, res) => {
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

// Dashboard Analytics Route
app.get("/api/dashboard-analytics", async (_req, res) => {
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

export const handler = serverless(app);
