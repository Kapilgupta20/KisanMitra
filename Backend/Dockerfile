# Use Node LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the files
COPY . .

# Expose port (match your .env PORT)
EXPOSE 8000

# Start the application
CMD ["npm", "start"]