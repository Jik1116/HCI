# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /src/pages

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build your Next.js app
RUN npm run build

# Expose the port your Next.js app will listen on
EXPOSE 3000

# Start your app when the container starts
CMD ["npm", "start"]
