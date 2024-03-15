# Use the official Node.js Alpine image as the base image

FROM node:20-alpine


# Set the working directory
WORKDIR /usr/src/app

# Install Chromium
# Set environment variables

    
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
RUN npm install

# Install the dependencies
RUN npm ci --only=production --ignore-scripts

# Copy the rest of the source code to the working directory
COPY . .

# Expose the port the API will run on
EXPOSE 3000

# Start the API
CMD ["npm", "start"]