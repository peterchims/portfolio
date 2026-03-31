# Premium Portfolio - Full Stack Application

A modern, premium portfolio website built with a .NET Core backend and React frontend. Features glass morphism design, advanced animations with Framer Motion, and a complete REST API.

## 🎯 Project Overview

This is a complete full-stack portfolio application with:

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: .NET 9.0 Core + Entity Framework Core + PostgreSQL
- **Database**: PostgreSQL with automatic migrations
- **Deployment**: Docker Compose with multi-service orchestration
- **Architecture**: RESTful API with service-based backend

## 📁 Project Structure

```
portfolio/
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        # Header, Footer
│   │   │   ├── sections/      # Hero, Projects, Skills, Testimonials, Blog, Contact
│   │   │   └── common/        # Shared components (Animations, etc.)
│   │   ├── styles/            # Global and component styles
│   │   ├── AppModern.tsx      # Main app component
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── Dockerfile             # Multi-stage (development & production)
│   └── nginx.conf             # Production server config
│
├── backend/                    # .NET Core API
│   ├── Controllers/           # API endpoints (Projects, Blog, Contact, etc.)
│   ├── Services/              # Business logic (ProjectService, BlogService, etc.)
│   ├── Models/                # Domain entities
│   ├── DTOs/                  # Data transfer objects
│   ├── Data/                  # DbContext and migrations
│   ├── PortfolioAPI.csproj    # Project file
│   ├── Program.cs             # Startup configuration
│   ├── appsettings.json       # Configuration
│   ├── Dockerfile             # Multi-stage build
│   └── Properties/
│
├── docker-compose.yml         # Multi-service orchestration
├── Dockerfile                 # Docker guide (see DOCKER.md)
├── DOCKER.md                  # Comprehensive Docker documentation
├── package.json               # Workspace root
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose (recommended)
- OR: Node.js 20+ and .NET 9.0 SDK (for local development)
- PostgreSQL 16 (if running without Docker)

### Option 1: Docker Compose (Recommended)

```bash
# Start all services (database, API, frontend)
docker-compose up -d

# Services will be available at:
# - Frontend: http://localhost:5173 (dev) or http://localhost:3000 (prod)
# - API: http://localhost:5000
# - Database: localhost:5432
```

See [DOCKER.md](./DOCKER.md) for detailed Docker guide.

### Option 2: Local Development

#### Backend (.NET Core)

```bash
cd backend

# Restore NuGet packages
dotnet restore

# Update database
dotnet ef database update

# Run the API server
dotnet run

# API will be available at: http://localhost:5000
```

#### Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# App will be available at: http://localhost:5173
```

## 🎨 Frontend Features

### Design System
- **Glass Morphism** - Modern frosted glass effect UI
- **Gradient Accents** - Cyan, Purple, Pink color scheme
- **Dark Theme** - Professional dark background with premium feel
- **Responsive** - Mobile-first, fully responsive design

### Components
- **Header** - Fixed navigation with gradient logo
- **Hero Section** - Eye-catching introduction with CTAs
- **Projects** - Featured projects showcase with descriptions
- **Skills** - Professional skills with animated progress bars
- **Testimonials** - Client testimonials with ratings
- **Blog** - Latest blog articles and insights
- **Contact** - Contact form with validation
- **Footer** - Links and social media

### Animations
- Staggered entrance animations
- Hover effects and transitions
- Scroll-triggered animations
- Page transition effects
- Continuous background animations
- Interactive button effects

## 🛠️ Backend Features

### REST API Endpoints

**Projects**
- `GET /api/projects` - List all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/{id}` - Get project details
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/{id}` - Update project (admin)
- `DELETE /api/projects/{id}` - Delete project (admin)

**Blog**
- `GET /api/blog?page=1&pageSize=10` - List blog posts with pagination
- `GET /api/blog/{slug}` - Get blog post by slug
- `POST /api/blog` - Create blog post (admin)
- `PUT /api/blog/{id}` - Update blog post (admin)
- `DELETE /api/blog/{id}` - Delete blog post (admin)

**Contact**
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)
- `GET /api/contact/{id}` - Get contact details (admin)
- `PATCH /api/contact/{id}/status` - Update submission status (admin)
- `DELETE /api/contact/{id}` - Delete submission (admin)

**Skills** *(To be implemented)*
- `GET /api/skills` - List all skills
- `GET /api/skills/{category}` - Get skills by category

**Testimonials** *(To be implemented)*
- `GET /api/testimonials` - List approved testimonials
- `POST /api/testimonials` - Submit testimonial (public)

**Health**
- `GET /api/health` - Service health check

### Database Schema

**Projects**
- Title, Description, ImageUrl
- Technologies (array)
- SourceCodeUrl, LiveUrl
- IsFeatured, Order

**BlogPosts**
- Title, Slug (unique)
- Content, Excerpt
- ThumbnailUrl, Tags
- Category, IsPublished
- ViewCount, PublishedAt

**Contact**
- Name, Email, Subject
- Message, IpAddress
- Status (New/Read/Replied)

**Skills**
- Name, Category
- Proficiency (0-100)
- Icon, Order

**Testimonials**
- Name, Title, Company
- Content, Rating
- ImageUrl, IsApproved

## 🔧 Available Commands

### Root Level
```bash
npm install              # Install all dependencies
npm run dev:web         # Start frontend dev server
npm run dev:api         # Start backend (if using workspaces)
npm run build           # Build frontend
npm run lint            # Lint all code
npm run verify          # Full verification (lint, test, build)
```

### Frontend
```bash
cd frontend
npm run dev             # Start Vite dev server
npm run build           # Production build
npm run preview         # Preview production build
npm run lint            # Run ESLint
npm run typecheck       # TypeScript type checking
```

### Backend
```bash
cd backend
dotnet run              # Run development server
dotnet build            # Build project
dotnet publish          # Publish for production
dotnet test             # Run tests (if added)
dotnet ef migrations add MigrationName  # Create migration
dotnet ef database update               # Apply migrations
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop services
docker-compose down

# Remove volumes (DELETE DATA)
docker-compose down -v

# Build specific service
docker-compose build api

# Execute command in container
docker-compose exec api dotnet --version
```

See [DOCKER.md](./DOCKER.md) for complete Docker guide.

## 📊 Database Setup

### Automatic (via Docker)
When running with Docker Compose, the database is automatically initialized:
```bash
docker-compose up -d
# Database migrations run automatically on startup
```

### Manual
```bash
# Create migrations
cd backend
dotnet ef migrations add InitialCreate

# Apply migrations
dotnet ef database update

# Connection string in appsettings.json:
# Host=localhost;Database=portfolio_db;Username=postgres;Password=postgres
```

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Backend (appsettings.Development.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=portfolio_db;Username=postgres;Password=postgres"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

## 🎓 Development Workflow

### 1. Start Services
```bash
docker-compose up -d
```

### 2. Frontend Development
```bash
cd frontend
npm run dev
# Visit http://localhost:5173
# Changes auto-reload
```

### 3. Backend Development
```bash
cd backend
dotnet run
# API available at http://localhost:5000
# Changes require restart
```

### 4. Database Changes
```bash
cd backend
dotnet ef migrations add NewFeature
dotnet ef database update
```

### 5. Git Workflow
```bash
git add .
git commit -m "feat: add feature"
git push origin develop
```

## 📦 Deployment

### Docker Compose Deployment
```bash
# Build production images
docker-compose build

# Run in production mode
docker-compose --profile production up -d

# Services available at:
# - Frontend: http://your-server:3000
# - API: http://your-server:5000
```

### Cloud Deployment
See `production.md` for detailed cloud deployment guide.

## 🎨 Design System

### Colors
- **Primary**: Deep Navy (#0f172a)
- **Accent 1**: Cyan (#06b6d4)
- **Accent 2**: Purple (#8b5cf6)
- **Accent 3**: Pink (#ec4899)
- **Text**: Off-white (#f1f5f9)

### Typography
- **Headings**: Bold, clamp sizing
- **Body**: 1.1rem, 1.6 line height
- **Font**: Inter, system fonts fallback

See `styleguide.md` for complete design guidelines.

## 🔒 Security

- CORS configured for development (restrict in production)
- Input validation with FluentValidation (ready to implement)
- Database migrations for schema versioning
- Connection string management via configuration
- Health checks for monitoring

## 📝 Git Workflow

### Husky Hooks
```bash
# Pre-commit: Linting
# Pre-push: Full verification
```

### Branch Strategy
- `main` - Production releases
- `develop` - Development branch
- `feature/*` - Feature branches

## 🐛 Troubleshooting

### Port Conflicts
```bash
# Find process on port (e.g., 5173)
lsof -i :5173

# Kill process
kill -9 <PID>
```

### Database Connection
```bash
# Check PostgreSQL
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d
```

### API Not Responding
```bash
# Check health
curl http://localhost:5000/api/health

# View logs
docker-compose logs api
```

## 📚 Documentation

- [DOCKER.md](./DOCKER.md) - Complete Docker guide
- [production.md](./production.md) - Production deployment
- [styleguide.md](./styleguide.md) - Design system

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## 👤 Author

**Peter Ogba**  
Portfolio: https://peterogba.dev  
GitHub: https://github.com/peterogba

## ✨ Acknowledgments

- Built with React, .NET Core, Tailwind CSS, and Framer Motion
- Database: PostgreSQL
- Deployment: Docker & Docker Compose
- Icons: Lucide React
