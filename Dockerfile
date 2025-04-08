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


# # Step 1: Use the official Node.js 18 image
# FROM node:18.20.4 AS build

# # Step 2: Set working directory
# WORKDIR /app

# # Step 3: Copy package.json and package-lock.json to /app directory
# COPY package.json package-lock.json ./

# # Step 4: Install all dependencies (including dev dependencies)
# RUN npm install

# # Step 5: Copy the rest of the application code into /app directory
# COPY . .

# # Step 6: Build the Next.js app
# RUN npm run build

# # Step 7: Use a smaller image for production
# FROM node:18.20.4-slim

# WORKDIR /app

# # Step 8: Copy the necessary files from the build stage
# COPY --from=build /app/package.json /app/package-lock.json /app/.next /app/public /app/

# # Step 9: Expose port 3000 (Next.js default port)
# EXPOSE 3000

# # Step 10: Start the application in production mode
# CMD ["npm", "run", "start"]

