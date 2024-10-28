# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /home

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the app's source code inside the Docker image
COPY . .



