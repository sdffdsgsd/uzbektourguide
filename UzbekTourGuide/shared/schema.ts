import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  region: text("region").notNull(),
  category: text("category").notNull(), // historical, natural, cultural
  duration: text("duration").notNull(), // e.g., "2-3 days"
  imageUrl: text("image_url").notNull(),
  gallery: text("gallery").array().notNull().default([]),
  openingHours: text("opening_hours"),
  entryFee: text("entry_fee"),
  bestTimeToVisit: text("best_time_to_visit"),
  highlights: text("highlights").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  latitude: text("latitude"),
  longitude: text("longitude"),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
