import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waterProjects = pgTable("water_projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  projectType: text("project_type").notNull(),
  peopleServed: integer("people_served").notNull(),
  status: text("status").notNull(),
  completion: integer("completion").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const waterStatistics = pgTable("water_statistics", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  value: integer("value").notNull(),
  label: text("label").notNull(),
  year: integer("year").notNull(),
  region: text("region"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Community Stories
export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  caption: text("caption").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  authorName: text("author_name").notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWaterProjectSchema = createInsertSchema(waterProjects).omit({
  id: true,
  createdAt: true,
});

export const insertWaterStatisticsSchema = createInsertSchema(waterStatistics).omit({
  id: true,
  createdAt: true,
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  createdAt: true,
});

export const insertStorySchema = createInsertSchema(stories).omit({ id: true, createdAt: true });

export type WaterProject = typeof waterProjects.$inferSelect;
export type InsertWaterProject = z.infer<typeof insertWaterProjectSchema>;
export type WaterStatistics = typeof waterStatistics.$inferSelect;
export type InsertWaterStatistics = z.infer<typeof insertWaterStatisticsSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type Story = typeof stories.$inferSelect;
export type InsertStory = z.infer<typeof insertStorySchema>;
