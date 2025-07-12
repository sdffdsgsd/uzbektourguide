# Uzbekistan Tourism Web Application

## Overview

This is a modern React-based tourism web application showcasing destinations and attractions in Uzbekistan. The application provides a comprehensive platform for discovering historical sites, natural landmarks, and cultural attractions throughout the country.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using modern React with TypeScript, utilizing a component-based architecture:

- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: TailwindCSS with shadcn/ui components for consistent design
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
The backend follows a RESTful API architecture:

- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with proper HTTP status codes
- **Error Handling**: Centralized error handling middleware
- **Logging**: Request/response logging with timing information

### Data Storage
The application uses PostgreSQL as the primary database:

- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Development Storage**: In-memory storage implementation for development/testing

## Key Components

### Frontend Components
- **Pages**: Home, Destinations listing, Destination detail, and 404 error page
- **Reusable Components**: Header, Footer, Hero section, Destination cards, Category cards, Photo gallery
- **UI Components**: Complete shadcn/ui component library for consistent styling
- **Routing**: File-based routing with dynamic parameters for destination details

### Backend Components
- **Routes**: RESTful API endpoints for destination management
- **Storage Layer**: Abstracted storage interface with both memory and database implementations
- **Middleware**: Request logging, JSON parsing, and error handling

### Database Schema
- **Destinations Table**: Comprehensive destination information including:
  - Basic info (name, description, region, category)
  - Media (image URLs, photo galleries)
  - Practical info (opening hours, entry fees, best visit times)
  - Geolocation (latitude, longitude)
  - Features (highlights array, featured flag)

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express.js routes handle requests and validate input with Zod schemas
3. **Storage Layer**: Abstract storage interface allows switching between memory and database storage
4. **Database Operations**: Drizzle ORM handles type-safe database interactions
5. **Response Flow**: Data flows back through the same layers with proper error handling

## External Dependencies

### Frontend Dependencies
- **UI Framework**: Radix UI primitives with shadcn/ui styling
- **State Management**: TanStack Query for server state caching
- **Styling**: TailwindCSS with custom Uzbekistan-themed color palette
- **Icons**: Lucide React icon library
- **Utilities**: Class variance authority, clsx, date-fns

### Backend Dependencies
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for schema validation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Development Dependencies
- **Build Tools**: Vite with React plugin and TypeScript support
- **Development**: TSX for TypeScript execution, ESBuild for production builds
- **Code Quality**: TypeScript strict mode, path aliases for clean imports

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR (Hot Module Replacement)
- **Backend**: TSX for running TypeScript files directly
- **Database**: Drizzle push for quick schema updates

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: ESBuild bundles server code for Node.js
- **Database**: Drizzle migrations for production schema management
- **Environment**: NODE_ENV-based configuration switching

### Architecture Decisions

1. **Monorepo Structure**: Single repository with client, server, and shared code for easier development and deployment
2. **TypeScript Throughout**: Full type safety from database to frontend
3. **Abstract Storage Layer**: Allows easy switching between development (memory) and production (database) storage
4. **Component-Based UI**: Reusable components with consistent styling via shadcn/ui
5. **Query-Based State**: TanStack Query handles caching, loading states, and error handling automatically
6. **Responsive Design**: Mobile-first approach with TailwindCSS responsive utilities

The application prioritizes type safety, developer experience, and user experience while maintaining clean separation of concerns between frontend, backend, and data layers.