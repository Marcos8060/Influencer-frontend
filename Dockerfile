# Step 1: Use an official Node.js image as the base image for building
FROM node:18 AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install all dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the Next.js app for production
RUN npm run build

# Step 7: Use a smaller Node.js image for running the app
FROM node:18-slim

# Step 8: Set the working directory inside the production container
WORKDIR /app

# Step 9: Copy the built files from the build stage to the production container
COPY --from=builder /app /app

# Step 10: Expose the port the app will run on (default is 3000 for Next.js)
EXPOSE 3000

# Step 11: Start the Next.js app in production mode
CMD ["npm", "start"]
