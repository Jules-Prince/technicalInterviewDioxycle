# Stage 1: Build the React application
FROM node:14 as build

WORKDIR /app

COPY frontend/package*.json .
RUN npm install

COPY frontend/ .
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:latest

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration file
COPY frontend/nginx.conf /etc/nginx/conf.d/

# Copy the built frontend files to Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
