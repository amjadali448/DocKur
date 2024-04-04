FROM node:14-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the React application
RUN npm run build

# Expose port (if needed)
EXPOSE 3000

# Command to run the application (serve the built files)
CMD ["npm", "start"]
