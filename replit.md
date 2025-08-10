# Water for All Initiative Dashboard

## Overview

This is a full-stack web application for managing and visualizing water aid projects worldwide. The application serves as a comprehensive platform for tracking water projects, managing statistics, showcasing impact through interactive dashboards and photo galleries, and analyzing WASH League Table indicators compliance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens for water-themed colors
- **State Management**: TanStack Query for server state and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Handling**: Multer for Excel file uploads
- **Excel Processing**: XLSX library for parsing spreadsheet data
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple

### Data Storage Architecture
- **Primary Database**: PostgreSQL with three main tables:
  - `water_projects`: Project information including location, type, people served, and status
  - `water_statistics`: Statistical data categorized by region, year, and metrics
  - `gallery_images`: Photo gallery with categorized images and metadata
- **ORM**: Drizzle ORM with TypeScript-first schema definitions
- **Schema Validation**: Zod for runtime type validation and API request validation

## Key Components

### Database Schema
The application uses three primary entities:
1. **Water Projects**: Tracks individual water infrastructure projects with completion status and impact metrics
2. **Water Statistics**: Stores aggregated data for analytics and reporting
3. **Gallery Images**: Manages photo content with categorization and metadata

### API Layer
RESTful API endpoints for:
- Water project CRUD operations
- Statistical data retrieval and bulk import
- Gallery image management
- Excel file upload and processing
- Dashboard analytics aggregation

### User Interface Components
- **Home Page**: Hero section with impact statistics and mission information
- **Analytics Dashboard**: Interactive data visualization with upload capabilities
- **WASH Analysis**: WASH League Table indicators mapping and compliance analysis
- **Photo Gallery**: Filtered image gallery with modal views
- **Navigation**: Responsive navigation with mobile menu support

## Data Flow

1. **Data Input**: Excel files uploaded through the dashboard are processed and stored in the database
2. **Data Processing**: Statistics are aggregated and projects are tracked with real-time updates
3. **Data Visualization**: Dashboard components query the API to display charts, metrics, and project status
4. **Content Management**: Gallery images are categorized and displayed with filtering capabilities

## Recent Updates (January 2025)

### Contact Information Update
- **Organization Name**: Changed from "Water Aid Impact" to "Water for All Initiative"
- **Phone**: Updated to 08057478738
- **Email**: Updated to info@waterforallinitiative.com

### WASH League Table Integration
- **New WASH Analysis Page**: Added comprehensive mapping of WASH League Table indicators
- **Indicator Categories**: Policy/Legal Framework, Urban Water Supply, Small Town WASH, Rural WASH, Urban Sanitation
- **Status Tracking**: Covered (5), Partial (4), Missing (12) out of 21 total indicators
- **Gap Analysis**: Identifies missing data collection areas and enhancement opportunities
- **Export Functionality**: Analysis reports and recommendations generation

### Current Data Coverage Assessment
- **Strong Areas**: Rural water coverage, sanitation access, hygiene programs
- **Improvement Needed**: Urban service quality, policy documentation, financial sustainability metrics
- **Missing Elements**: Customer satisfaction, wastewater management, institutional frameworks

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL provider for production database hosting
- **Drizzle Kit**: Database migration and schema management tools

### UI Components
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets for social media and branding

### Development Tools
- **Vite**: Fast build tool with HMR and TypeScript support
- **Replit Integration**: Development environment integration with error overlays and debugging tools

## Deployment Strategy

The application is configured for deployment on Replit with:
- **Development Mode**: Vite dev server with hot module replacement
- **Production Build**: Static asset generation and Express server bundling
- **Database Migration**: Drizzle migrations for schema updates
- **Environment Variables**: Database connection and configuration management

The build process generates optimized static assets while maintaining the Express API server for dynamic functionality. The application supports both development and production environments with appropriate middleware and error handling.