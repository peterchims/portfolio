# -------------------------
# Build stage
# -------------------------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (include devDependencies for build)
COPY package*.json ./
RUN npm ci

# Copy all source code
COPY . .

# Build the application
RUN npm run build


# -------------------------
# Production stage
# -------------------------
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
