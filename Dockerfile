# -----------------
# Base dependencies
# -----------------
FROM node:18-alpine AS base
WORKDIR /app
# Copy only package files first to leverage Docker cache
COPY package*.json ./

# -----------------
# Development stage
# -----------------
FROM base AS dev
ENV NODE_ENV=development

# Install all dependencies including dev dependencies
RUN npm install

# Copy source code
COPY . .

# Expose Vite default port
EXPOSE 3000

# Install nodemon globally for hot reload (optional)
RUN npm install -g nodemon

# Command to run Vite in dev mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

# -----------------
# Build stage
# -----------------
FROM base AS build
ENV NODE_ENV=production

# Disable Husky during build
ENV HUSKY=0

# Install only production dependencies for smaller image
RUN npm ci --omit=dev && npm cache clean --force

# Copy the source code
COPY . .

# Build the Vite project
RUN npm run build

# -----------------
# Production stage (Nginx)
# -----------------
FROM nginx:alpine AS prod

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose default HTTP port
EXPOSE 80

# Optional healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
