# Multi-stage Dockerfile for React Frontend

# ===== Development Stage =====
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port for Vite dev server
EXPOSE 5173

# Run development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ===== Build Stage =====
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build for production
RUN npm run build

# ===== Production Stage =====
FROM nginx:alpine AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
