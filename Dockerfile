# Use official Node.js image as base for build stage
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all application files (source code)
COPY . .

# Build the app (static assets for production)
RUN npm run build

# Use a smaller image for production
FROM node:18.20.4-slim

WORKDIR /app

# Copy everything from the build stage to the production image
COPY --from=build /app /app
    
# Expose port 8080 for Cloud Run (Cloud Run expects port 8080)
EXPOSE 8080

# Set the environment variable to the expected Cloud Run port
ENV PORT 8080

# Start the app in production mode (it will listen on port 8080 as defined in next.config.js)
CMD ["npm", "run", "start"]
