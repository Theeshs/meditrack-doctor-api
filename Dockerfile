# Base image: Use a minimal Node.js image
FROM node:16-alpine

# Install git and other required dependencies
RUN apk add --no-cache git

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
