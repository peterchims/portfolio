# Docker Setup Guide

## Overview

This project uses **Docker Compose** to orchestrate a full-stack application with three services:

1. **PostgreSQL Database** - Data persistence
2. **.NET Core API** - Backend REST API (Port 5000)
3. **React Frontend** - Frontend application (Port 5173 dev / 3000 prod)

## Quick Start

### Prerequisites
- Docker >= 20.10
- Docker Compose >= 1.29
- .NET 9.0 SDK (if building locally without Docker)
- Node.js >= 20 (if building locally without Docker)

### Start All Services

```bash
# Build and start all services in development mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Access Points

| Service | URL | Notes |
|---------|-----|-------|
| React Frontend (Dev) | http://localhost:5173 | Hot Module Reload enabled |
| React Frontend (Prod) | http://localhost:3000 | Static Nginx server |
| .NET API | http://localhost:5000 | REST API endpoints |
| PostgreSQL | localhost:5432 | Database connection |
| API Health Check | http://localhost:5000/api/health | Service health status |

## Service Details

### PostgreSQL Database

```yaml
Container: portfolio-db
Port: 5432
Username: postgres
Password: postgres
Database: portfolio_db
```

**Connect to Database:**
```bash
docker-compose exec postgres psql -U postgres -d portfolio_db
```

**Persistent Volume:**
- Data is stored in `postgres_data` Docker volume
- Data persists across container restarts

### .NET Core API

```yaml
Container: portfolio-api
Port: 5000
Environment: Development (configurable)
```

**Build Context:** `./backend`

**Environment Variables:**
```
ASPNETCORE_URLS=http://+:5000
ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__DefaultConnection=Host=postgres;Database=portfolio_db;...
```

**Health Check:** `GET http://localhost:5000/api/health`

**API Endpoints:**
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `GET /api/blog` - Blog posts
- `GET /api/skills` - Skills list
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

### React Frontend

#### Development Mode

```yaml
Container: portfolio-frontend
Port: 5173
Build Target: development
```

**Features:**
- Hot Module Reload (HMR)
- Source maps for debugging
- Live source code mounting (`/frontend/src` volume)
- Access to Vite dev server

**Build Context:** `./frontend`

#### Production Mode

```yaml
Container: portfolio-frontend-prod
Port: 3000
Build Target: production
Server: Nginx
Profile: production
```

**Features:**
- Optimized/minified bundle
- Gzip compression enabled
- Aggressive caching for static assets
- Security headers configured
- React Router SPA routing support

**Run Production Mode:**
```bash
docker-compose --profile production up -d frontend-prod
```

## Commands

### Build Specific Service
```bash
# Build frontend
docker-compose build frontend

# Build API
docker-compose build api

# Build all
docker-compose build
```

### View Service Logs
```bash
# All services
docker-compose logs -f

# Specific service (e.g., API)
docker-compose logs -f api

# Follow live logs (last 50 lines)
docker-compose logs -f --tail 50 frontend
```

### Execute Commands in Container

```bash
# Run dotnet command in API container
docker-compose exec api dotnet --version

# Run npm command in frontend
docker-compose exec frontend npm --version

# Access PostgreSQL shell
docker-compose exec postgres psql -U postgres
```

### Development Workflow

```bash
# Start all services
docker-compose up -d

# Watch frontend dev server
docker-compose logs -f frontend

# In another terminal, monitor API logs
docker-compose logs -f api

# Make changes - they auto-reload in dev mode
# Edit frontend/src files → HMR updates at http://localhost:5173
# Edit backend code → rebuild with: docker-compose build api && docker-compose up -d api

# Stop services
docker-compose down
```

### Production Deployment

```bash
# Build production images
docker-compose build

# Use production compose override file (if available)
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Or run production profile
docker-compose --profile production up -d
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port (e.g., 5173)
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or use different ports in docker-compose.yml
```

### Database Connection Failed
```bash
# Check if postgres is healthy
docker-compose ps postgres

# View postgres logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### Build Fails
```bash
# Clean rebuild (removes all images)
docker-compose down --rmi all
docker-compose up -d

# Or rebuild a specific service
docker-compose build --no-cache api
```

### Frontend Dev Server Not Hot Reloading
```bash
# Ensure volumes are mounted correctly
docker inspect portfolio-frontend | grep -A 5 Mounts

# Restart frontend service
docker-compose restart frontend
```

### API Endpoint Returns 500
```bash
# Check API logs for error details
docker-compose logs api

# Verify database connection
docker-compose logs api | grep -i "connection\|error"

# Restart API service
docker-compose restart api
```

## Network

All services are connected via the `portfolio-network` bridge network:
- Services can communicate using container names (e.g., `http://api:5000`)
- External access uses `localhost:port`

## Volumes

### Named Volumes
- `postgres_data` - PostgreSQL data persistence

### Bind Mounts (Dev Only)
- `./frontend/src:/app/src` - Live source code reload
- `./frontend/public:/app/public` - Public assets

## Environment Configuration

### Development (.env)
```env
NODE_ENV=development
VITE_API_URL=http://localhost:5000
ASPNETCORE_ENVIRONMENT=Development
```

### Production (.env.prod)
```env
NODE_ENV=production
VITE_API_URL=https://api.example.com
ASPNETCORE_ENVIRONMENT=Production
```

## Health Checks

All services have health checks configured:

```bash
# Check service status
docker-compose ps

# View health details
docker inspect portfolio-api | grep -A 10 Health
```

## Cleanup

```bash
# Stop all services but keep volumes
docker-compose down

# Stop and remove volumes (DELETE DATA!)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Complete cleanup
docker-compose down -v --rmi all
docker volume rm portfolio_postgres_data
```

## Performance Tips

1. **Volume Mounts**: Dev mode volumes can slow performance. Use Docker for dependencies
2. **Layer Caching**: Use `.dockerignore` to exclude unnecessary files
3. **Multi-stage Builds**: Already optimized in Dockerfiles
4. **Health Checks**: Ensure services wait for dependencies

## Security Notes

⚠️ **Development Only Settings:**
- Hardcoded database credentials
- CORS set to "AllowAll"
- Debug logging enabled
- No HTTPS/TLS

**For Production:**
- Use environment variables for secrets
- Configure restrictive CORS
- Enable HTTPS/TLS
- Use strong passwords
- Enable authentication/authorization
- Set up proper logging & monitoring

## Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [.NET Core Docker Images](https://hub.docker.com/_/microsoft-dotnet)
- [Node.js Docker Images](https://hub.docker.com/_/node)
- [Nginx Official](https://hub.docker.com/_/nginx)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)
