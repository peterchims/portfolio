# -----------------
# Base dependencies
# -----------------
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# -----------------
# Development stage
# -----------------
FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]


# -----------------
# Build stage
# -----------------
FROM base AS build
ENV NODE_ENV=production
# Disable Husky during build
ENV HUSKY=0
RUN npm ci --omit=dev && npm cache clean --force
COPY . .
RUN npm run build

# -----------------
# Production stage (nginx)
# -----------------
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
