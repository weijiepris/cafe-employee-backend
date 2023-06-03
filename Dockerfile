# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . ./

# Expose the port on which your Express application listens
EXPOSE 3001

# Set the command to start the Express application
CMD [ "npm", "start" ]