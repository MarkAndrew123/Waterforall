import { waterProjects, waterStatistics, galleryImages, stories, type WaterProject, type WaterStatistics, type GalleryImage, type Story, type InsertWaterProject, type InsertWaterStatistics, type InsertGalleryImage, type InsertStory } from "@shared/schema";

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

  // Community Stories ("Tell Your Story")
  getStories(): Promise<Story[]>;
  createStory(story: InsertStory): Promise<Story>;
}

export class MemStorage implements IStorage {
  private waterProjects: Map<number, WaterProject>;
  private waterStatistics: Map<number, WaterStatistics>;
  private galleryImages: Map<number, GalleryImage>;
  private stories: Map<number, Story>;
  private currentProjectId: number;
  private currentStatsId: number;
  private currentImageId: number;
  private currentStoryId: number;

  constructor() {
    this.waterProjects = new Map();
    this.waterStatistics = new Map();
    this.galleryImages = new Map();
    this.stories = new Map();
    this.currentProjectId = 1;
    this.currentStatsId = 1;
    this.currentImageId = 1;
    this.currentStoryId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Initialize with zero statistics - League hasn't started yet
    const sampleStats: InsertWaterStatistics[] = [
      { category: "clean_water_access", value: 0, label: "People with Clean Water Access", year: 2025 },
      { category: "schools_water", value: 0, label: "Schools with Clean Water", year: 2025 },
      { category: "decent_toilets", value: 0, label: "Households with Improved Sanitation", year: 2025 },
      { category: "health_hygiene", value: 0, label: "Health Facilities with WASH", year: 2025 },
      { category: "total_projects", value: 0, label: "Total Projects", year: 2025 },
      { category: "water_flowing", value: 0, label: "Water Points Functional (%)", year: 2025 },
      { category: "active_states", value: 37, label: "Participating States", year: 2025 },
      { category: "funding_raised", value: 0, label: "Investments (₦)", year: 2025 },
    ];

    sampleStats.forEach(stat => {
      this.createWaterStatistics(stat);
    });

    // Seed Mock Stories from Africa
    const mockStories: InsertStory[] = [
      {
        caption: "Clean water flows in Kisumu!",
        description: "After months of collaborative work with the local community, the new borehole in Kisumu, Kenya is operational. Over 500 families now have direct access to clean, safe drinking water, eliminating the long daily trek to the contaminated river source.",
        imageUrl: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=2070&auto=format&fit=crop",
        authorName: "Sarah Amadi",
        location: "Kisumu, Kenya"
      },
      {
        caption: "Hygiene education saves lives.",
        description: "Our hygiene workshop in rural Ghana was a massive success. We trained 50 community health volunteers who will now teach proper handwashing techniques in schools and markets. This is a critical step in preventing waterborne diseases.",
        imageUrl: "https://images.unsplash.com/photo-1541976844346-f18aeac57230?q=80&w=2070&auto=format&fit=crop",
        authorName: "Kwame Osei",
        location: "Volta Region, Ghana"
      },
      {
        caption: "New solar pump installed in Rwanda.",
        description: "The installation of the solar-powered water pump is complete! This sustainable solution ensures a reliable water supply for the health clinic, even during power outages. It's a game-changer for patient care and sanitation.",
        imageUrl: "https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?q=80&w=1974&auto=format&fit=crop",
        authorName: "Jean-Paul Uwimana",
        location: "Musanze, Rwanda"
      },
      {
        caption: "Empowering women through water access.",
        description: "With the new well in place, women in this Nigerian village have reclaimed hours of their day previously spent fetching water. Many are now starting small businesses and attending adult education classes. Water is truly empowerment!",
        imageUrl: "https://images.unsplash.com/photo-1533615128004-94e82df23f13?q=80&w=2070&auto=format&fit=crop",
        authorName: "Ngozi Okafor",
        location: "Enugu State, Nigeria"
      },
      {
        caption: "Sanitation facilities for the local school.",
        description: "We are proud to hand over the newly constructed gender-separated latrines to the primary school. This will significantly improve attendance, especially for girls, and provide a dignified sanitation environment for all students.",
        imageUrl: "https://images.unsplash.com/photo-1455620611406-966ca6889d80?q=80&w=2070&auto=format&fit=crop",
        authorName: "David Moyo",
        location: "Lilongwe, Malawi"
      }
    ];

    mockStories.forEach(story => {
      this.createStory(story);
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
      id,
      category: insertStats.category,
      value: insertStats.value,
      label: insertStats.label,
      year: insertStats.year,
      region: insertStats.region ?? null,
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
      id,
      title: insertImage.title,
      description: insertImage.description ?? null,
      imageUrl: insertImage.imageUrl,
      category: insertImage.category,
      location: insertImage.location ?? null,
      createdAt: new Date(),
    };
    this.galleryImages.set(id, image);
    return image;
  }

  async getStories(): Promise<Story[]> {
    // Return newest first
    return Array.from(this.stories.values()).sort((a, b) =>
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.currentStoryId++;
    const story: Story = {
      ...insertStory,
      id,
      createdAt: new Date(),
    };
    this.stories.set(id, story);
    return story;
  }
}

// Check if Supabase is configured, otherwise use memory storage
function createStorage(): IStorage {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('🗄️  Using Supabase PostgreSQL storage');
    const { SupabaseStorage } = require('./supabase-storage');
    return new SupabaseStorage();
  } else {
    console.log('⚠️  Using in-memory storage (data will be lost on restart)');
    return new MemStorage();
  }
}

export const storage = createStorage();
