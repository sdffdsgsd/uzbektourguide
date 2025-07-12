import { destinations, type Destination, type InsertDestination } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  getFeaturedDestinations(): Promise<Destination[]>;
  getDestinationsByCategory(category: string): Promise<Destination[]>;
  searchDestinations(query: string): Promise<Destination[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  currentUserId: number;
  currentDestinationId: number;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.currentUserId = 1;
    this.currentDestinationId = 1;
    this.initializeDestinations();
  }

  private initializeDestinations() {
    const initialDestinations: Omit<Destination, 'id'>[] = [
      {
        name: "Samarkand",
        description: "The crossroads of cultures, featuring the magnificent Registan Square with its stunning madrasas and intricate tilework.",
        region: "Samarkand Region",
        category: "historical",
        duration: "2-3 days",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1626595223788-0c69e0a5b251?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        openingHours: "9:00 AM - 6:00 PM",
        entryFee: "50,000 UZS",
        bestTimeToVisit: "April to June, September to November",
        highlights: ["Registan Square", "Gur-e-Amir Mausoleum", "Bibi-Khanym Mosque", "Shah-i-Zinda"],
        featured: true,
        latitude: "39.6547",
        longitude: "66.9750"
      },
      {
        name: "Bukhara",
        description: "A living museum of Islamic architecture with over 140 architectural monuments dating back to medieval times.",
        region: "Bukhara Region",
        category: "historical",
        duration: "2-3 days",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1626595223951-12c5a87e5f32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        openingHours: "8:00 AM - 7:00 PM",
        entryFee: "40,000 UZS",
        bestTimeToVisit: "April to June, September to November",
        highlights: ["Poi Kalyan Complex", "Ark Fortress", "Lyab-i Hauz", "Trading Domes"],
        featured: true,
        latitude: "39.7747",
        longitude: "64.4286"
      },
      {
        name: "Tashkent",
        description: "The vibrant capital city blending modern urban life with traditional Uzbek culture and beautiful parks.",
        region: "Tashkent Region",
        category: "cultural",
        duration: "1-2 days",
        imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1626595223951-12c5a87e5f32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        openingHours: "24/7",
        entryFee: "Free",
        bestTimeToVisit: "April to October",
        highlights: ["Chorsu Bazaar", "Independence Square", "Tashkent Metro", "Kukeldash Madrasah"],
        featured: true,
        latitude: "41.2995",
        longitude: "69.2401"
      },
      {
        name: "Khiva",
        description: "An ancient walled city showcasing perfectly preserved Islamic architecture in the heart of the Kyzylkum Desert.",
        region: "Khorezm Region",
        category: "historical",
        duration: "1-2 days",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        openingHours: "8:00 AM - 6:00 PM",
        entryFee: "80,000 UZS",
        bestTimeToVisit: "April to June, September to November",
        highlights: ["Ichan Kala", "Kunya Ark", "Islam Khoja Minaret", "Tash Hauli Palace"],
        featured: false,
        latitude: "41.3775",
        longitude: "60.3619"
      },
      {
        name: "Ferghana Valley",
        description: "A fertile valley known for its traditional crafts, silk production, and stunning mountain landscapes.",
        region: "Ferghana Region",
        category: "natural",
        duration: "3-4 days",
        imageUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1626595223951-12c5a87e5f32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        openingHours: "Varies by location",
        entryFee: "Free to 30,000 UZS",
        bestTimeToVisit: "May to September",
        highlights: ["Rishtan Ceramics", "Margilan Silk Factory", "Kokand Palace", "Mountain Villages"],
        featured: false,
        latitude: "40.3842",
        longitude: "71.7843"
      },
      {
        name: "Aral Sea",
        description: "A dramatic landscape showcasing the environmental history of Central Asia with ship graveyards and desert views.",
        region: "Karakalpakstan",
        category: "natural",
        duration: "2 days",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        openingHours: "24/7",
        entryFee: "Free",
        bestTimeToVisit: "April to June, September to November",
        highlights: ["Ship Graveyard", "Moynaq Museum", "Desert Landscapes", "Former Seabed"],
        featured: false,
        latitude: "45.0000",
        longitude: "59.0000"
      }
    ];

    initialDestinations.forEach(dest => {
      const destination: Destination = {
        ...dest,
        id: this.currentDestinationId++
      };
      this.destinations.set(destination.id, destination);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(dest => dest.featured);
  }

  async getDestinationsByCategory(category: string): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(dest => dest.category === category);
  }

  async searchDestinations(query: string): Promise<Destination[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.destinations.values()).filter(dest => 
      dest.name.toLowerCase().includes(lowercaseQuery) ||
      dest.description.toLowerCase().includes(lowercaseQuery) ||
      dest.region.toLowerCase().includes(lowercaseQuery) ||
      dest.highlights.some(highlight => highlight.toLowerCase().includes(lowercaseQuery))
    );
  }
}

export const storage = new MemStorage();
