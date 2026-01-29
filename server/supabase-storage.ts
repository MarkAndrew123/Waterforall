import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
    WaterProject, WaterStatistics, GalleryImage, Story,
    InsertWaterProject, InsertWaterStatistics, InsertGalleryImage, InsertStory
} from "@shared/schema";
import { IStorage } from "./storage";

export class SupabaseStorage implements IStorage {
    private supabase: SupabaseClient;

    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
        }

        this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    // Water Projects
    async getWaterProjects(): Promise<WaterProject[]> {
        const { data, error } = await this.supabase
            .from('water_projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    async getWaterProject(id: number): Promise<WaterProject | undefined> {
        const { data, error } = await this.supabase
            .from('water_projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return undefined;
        return data;
    }

    async createWaterProject(project: InsertWaterProject): Promise<WaterProject> {
        const { data, error } = await this.supabase
            .from('water_projects')
            .insert([{
                name: project.name,
                location: project.location,
                project_type: project.projectType,
                people_served: project.peopleServed,
                status: project.status,
                completion: project.completion
            }])
            .select()
            .single();

        if (error) throw error;
        return this.mapWaterProject(data);
    }

    async updateWaterProject(id: number, project: Partial<InsertWaterProject>): Promise<WaterProject | undefined> {
        const updateData: any = {};
        if (project.name) updateData.name = project.name;
        if (project.location) updateData.location = project.location;
        if (project.projectType) updateData.project_type = project.projectType;
        if (project.peopleServed) updateData.people_served = project.peopleServed;
        if (project.status) updateData.status = project.status;
        if (project.completion !== undefined) updateData.completion = project.completion;

        const { data, error } = await this.supabase
            .from('water_projects')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) return undefined;
        return this.mapWaterProject(data);
    }

    private mapWaterProject(data: any): WaterProject {
        return {
            id: data.id,
            name: data.name,
            location: data.location,
            projectType: data.project_type,
            peopleServed: data.people_served,
            status: data.status,
            completion: data.completion,
            createdAt: new Date(data.created_at)
        };
    }

    // Water Statistics
    async getWaterStatistics(): Promise<WaterStatistics[]> {
        const { data, error } = await this.supabase
            .from('water_statistics')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []).map(this.mapWaterStats);
    }

    async getWaterStatisticsByCategory(category: string): Promise<WaterStatistics[]> {
        const { data, error } = await this.supabase
            .from('water_statistics')
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []).map(this.mapWaterStats);
    }

    async createWaterStatistics(stats: InsertWaterStatistics): Promise<WaterStatistics> {
        const { data, error } = await this.supabase
            .from('water_statistics')
            .insert([{
                category: stats.category,
                value: stats.value,
                label: stats.label,
                year: stats.year,
                region: stats.region || null
            }])
            .select()
            .single();

        if (error) throw error;
        return this.mapWaterStats(data);
    }

    async bulkCreateWaterStatistics(statsArray: InsertWaterStatistics[]): Promise<WaterStatistics[]> {
        const insertData = statsArray.map(stats => ({
            category: stats.category,
            value: stats.value,
            label: stats.label,
            year: stats.year,
            region: stats.region || null
        }));

        const { data, error } = await this.supabase
            .from('water_statistics')
            .insert(insertData)
            .select();

        if (error) throw error;
        return (data || []).map(this.mapWaterStats);
    }

    private mapWaterStats(data: any): WaterStatistics {
        return {
            id: data.id,
            category: data.category,
            value: data.value,
            label: data.label,
            year: data.year,
            region: data.region,
            createdAt: new Date(data.created_at)
        };
    }

    // Gallery Images
    async getGalleryImages(): Promise<GalleryImage[]> {
        const { data, error } = await this.supabase
            .from('gallery_images')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []).map(this.mapGalleryImage);
    }

    async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
        const { data, error } = await this.supabase
            .from('gallery_images')
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []).map(this.mapGalleryImage);
    }

    async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
        const { data, error } = await this.supabase
            .from('gallery_images')
            .insert([{
                title: image.title,
                description: image.description || null,
                image_url: image.imageUrl,
                category: image.category,
                location: image.location || null
            }])
            .select()
            .single();

        if (error) throw error;
        return this.mapGalleryImage(data);
    }

    private mapGalleryImage(data: any): GalleryImage {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            imageUrl: data.image_url,
            category: data.category,
            location: data.location,
            createdAt: new Date(data.created_at)
        };
    }

    // Community Stories
    async getStories(): Promise<Story[]> {
        const { data, error } = await this.supabase
            .from('stories')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []).map(this.mapStory);
    }

    async createStory(story: InsertStory): Promise<Story> {
        const { data, error } = await this.supabase
            .from('stories')
            .insert([{
                caption: story.caption,
                description: story.description,
                image_url: story.imageUrl,
                author_name: story.authorName,
                location: story.location
            }])
            .select()
            .single();

        if (error) throw error;
        return this.mapStory(data);
    }

    private mapStory(data: any): Story {
        return {
            id: data.id,
            caption: data.caption,
            description: data.description,
            imageUrl: data.image_url,
            authorName: data.author_name,
            location: data.location,
            createdAt: new Date(data.created_at)
        };
    }
}
