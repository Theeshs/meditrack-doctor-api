# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Install development dependencies if needed
RUN npm install -g @nestjs/cli nodemon

# Expose the application port
EXPOSE 3001

# Start the application in development mode with hot reload
CMD ["npm", "run", "start:dev"]
