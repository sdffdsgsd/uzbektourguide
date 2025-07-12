import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all destinations
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getAllDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  // Get featured destinations
  app.get("/api/destinations/featured", async (req, res) => {
    try {
      const destinations = await storage.getFeaturedDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured destinations" });
    }
  });

  // Get destinations by category
  app.get("/api/destinations/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const destinations = await storage.getDestinationsByCategory(category);
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations by category" });
    }
  });

  // Search destinations
  app.get("/api/destinations/search", async (req, res) => {
    try {
      const querySchema = z.object({
        q: z.string().min(1, "Search query is required")
      });
      
      const { q } = querySchema.parse(req.query);
      const destinations = await storage.searchDestinations(q);
      res.json(destinations);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Failed to search destinations" });
      }
    }
  });

  // Get single destination
  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid destination ID" });
      }
      
      const destination = await storage.getDestination(id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
