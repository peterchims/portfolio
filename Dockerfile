# This project uses a multi-service Docker Compose setup with individual Dockerfiles
# for each service:
#
# - frontend/Dockerfile   - React frontend with Vite (development & Nginx production)
# - backend/Dockerfile    - .NET 9.0 Core API
#
# To build and run the full stack:
#   docker-compose up -d
#
# To build individual services:
#   docker-compose build api
#   docker-compose build frontend
#   docker-compose build postgres
#
# Services will be available at:
#   - Frontend (dev):  http://localhost:5173
#   - Frontend (prod): http://localhost:3000
#   - API:             http://localhost:5000
#   - Database:        localhost:5432
#
# See docker-compose.yml for detailed configuration

