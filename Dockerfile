# Use Node.js LTS (Latest LTS version)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./

# Install required dependencies
RUN npm install clsx tailwind-merge zustand react-icons

# Install other dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"] 