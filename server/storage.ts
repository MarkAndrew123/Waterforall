import { waterProjects, waterStatistics, galleryImages, type WaterProject, type WaterStatistics, type GalleryImage, type InsertWaterProject, type InsertWaterStatistics, type InsertGalleryImage } from "@shared/schema";

export interface IStorage {
  // Water Projects
  getWaterProjects(): Promise<WaterProject[]>;
  getWaterProject(id: number): Promise<WaterProject | undefined>;
  createWaterProject(project: InsertWaterProject): Promise<WaterProject>;
  updateWaterProject(id: number, project: Partial<InsertWaterProject>): Promise<WaterProject | undefined>;
  
  // Water Statistics
  getWaterStatistics(): Promise<WaterStatistics[]>;
  getWaterStatisticsByCategory(category: string): Promise<WaterStatistics[]>;
  createWaterStatistics(stats: InsertWaterStatistics): Promise<WaterStatistics>;
  bulkCreateWaterStatistics(stats: InsertWaterStatistics[]): Promise<WaterStatistics[]>;
  
  // Gallery Images
  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImagesByCategory(category: string): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
}

export class MemStorage implements IStorage {
  private waterProjects: Map<number, WaterProject>;
  private waterStatistics: Map<number, WaterStatistics>;
  private galleryImages: Map<number, GalleryImage>;
  private currentProjectId: number;
  private currentStatsId: number;
  private currentImageId: number;

  constructor() {
    this.waterProjects = new Map();
    this.waterStatistics = new Map();
    this.galleryImages = new Map();
    this.currentProjectId = 1;
    this.currentStatsId = 1;
    this.currentImageId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample projects
    const sampleProjects: InsertWaterProject[] = [
      {
        name: "Kambi Primary School Well",
        location: "Kenya",
        projectType: "Borehole Installation",
        peopleServed: 1247,
        status: "Active",
        completion: 100,
      },
      {
        name: "Mwanzi Community Spring",
        location: "Uganda",
        projectType: "Spring Protection",
        peopleServed: 892,
        status: "In Progress",
        completion: 75,
      },
      {
        name: "Nakuru Health Center",
        location: "Kenya",
        projectType: "Sanitation Facilities",
        peopleServed: 2156,
        status: "Planning",
        completion: 25,
      },
    ];

    sampleProjects.forEach(project => {
      this.createWaterProject(project);
    });

    // Initialize with sample statistics
    const sampleStats: InsertWaterStatistics[] = [
      { category: "clean_water_access", value: 896000, label: "People with Clean Water Access", year: 2024 },
      { category: "schools_water", value: 74844, label: "Students in Schools with Clean Water", year: 2024 },
      { category: "decent_toilets", value: 252599, label: "People with Decent Toilets", year: 2024 },
      { category: "health_hygiene", value: 872030, label: "People in Health Centers with Better Hygiene", year: 2024 },
      { category: "total_projects", value: 2663, label: "Total Projects", year: 2024 },
      { category: "water_flowing", value: 96, label: "Water Flowing Percentage", year: 2024 },
      { category: "active_countries", value: 34, label: "Active Countries", year: 2024 },
      { category: "funding_raised", value: 44800000, label: "Funding Raised (USD)", year: 2024 },
    ];

    sampleStats.forEach(stat => {
      this.createWaterStatistics(stat);
    });

    // Initialize with sample gallery images
    const sampleImages: InsertGalleryImage[] = [
      {
        title: "New Water Well in Kenya",
        description: "Providing clean water access to 1,200 community members",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "projects",
        location: "Kenya",
      },
      {
        title: "Clean Water Access Point",
        description: "Safe water collection in urban communities",
        imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "access",
        location: "Urban Community",
      },
      {
        title: "Water Treatment Facility",
        description: "Advanced filtration systems ensuring water quality",
        imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "infrastructure",
        location: "Treatment Plant",
      },
      {
        title: "Community Transformation",
        description: "Families enjoying the benefits of clean water access",
        imageUrl: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "communities",
        location: "Rural Village",
      },
      {
        title: "Pipeline Installation",
        description: "Connecting remote communities to clean water sources",
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "projects",
        location: "Remote Area",
      },
      {
        title: "School Hygiene Program",
        description: "Teaching proper handwashing with clean water",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "access",
        location: "School",
      },
    ];

    sampleImages.forEach(image => {
      this.createGalleryImage(image);
    });
  }

  async getWaterProjects(): Promise<WaterProject[]> {
    return Array.from(this.waterProjects.values());
  }

  async getWaterProject(id: number): Promise<WaterProject | undefined> {
    return this.waterProjects.get(id);
  }

  async createWaterProject(insertProject: InsertWaterProject): Promise<WaterProject> {
    const id = this.currentProjectId++;
    const project: WaterProject = {
      ...insertProject,
      id,
      createdAt: new Date(),
    };
    this.waterProjects.set(id, project);
    return project;
  }

  async updateWaterProject(id: number, updateProject: Partial<InsertWaterProject>): Promise<WaterProject | undefined> {
    const existing = this.waterProjects.get(id);
    if (!existing) return undefined;

    const updated: WaterProject = {
      ...existing,
      ...updateProject,
    };
    this.waterProjects.set(id, updated);
    return updated;
  }

  async getWaterStatistics(): Promise<WaterStatistics[]> {
    return Array.from(this.waterStatistics.values());
  }

  async getWaterStatisticsByCategory(category: string): Promise<WaterStatistics[]> {
    return Array.from(this.waterStatistics.values()).filter(
      stat => stat.category === category
    );
  }

  async createWaterStatistics(insertStats: InsertWaterStatistics): Promise<WaterStatistics> {
    const id = this.currentStatsId++;
    const stats: WaterStatistics = {
      ...insertStats,
      id,
      createdAt: new Date(),
    };
    this.waterStatistics.set(id, stats);
    return stats;
  }

  async bulkCreateWaterStatistics(statsArray: InsertWaterStatistics[]): Promise<WaterStatistics[]> {
    const results: WaterStatistics[] = [];
    for (const stats of statsArray) {
      const created = await this.createWaterStatistics(stats);
      results.push(created);
    }
    return results;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values());
  }

  async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values()).filter(
      image => image.category === category
    );
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = this.currentImageId++;
    const image: GalleryImage = {
      ...insertImage,
      id,
      createdAt: new Date(),
    };
    this.galleryImages.set(id, image);
    return image;
  }
}

export const storage = new MemStorage();
