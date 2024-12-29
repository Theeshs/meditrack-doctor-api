# Base image: Use Node.js alpine
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (production + development)
RUN npm ci

# Copy application code
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application in development mode
CMD ["npm", "run", "start:dev"]
