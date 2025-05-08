# Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Install MongoDB 6.0 with libssl1.1 workaround
RUN apt-get update && apt-get install -y wget gnupg curl

# Add MongoDB repository
RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/debian bullseye/mongodb-org/6.0 main" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install libssl1.1 from Debian Bullseye repository
RUN wget http://security.debian.org/debian-security/pool/updates/main/o/openssl/libssl1.1_1.1.1n-0+deb10u6_amd64.deb
RUN dpkg -i libssl1.1_1.1.1n-0+deb10u6_amd64.deb

# Install MongoDB
RUN apt-get update && apt-get install -y mongodb-org

# Create directory for MongoDB data
RUN mkdir -p /data/db

# Install specific npm version (9.2.0)
RUN npm install -g npm@9.2.0

# Install Angular CLI
RUN npm install -g @angular/cli@15

# Install PM2 globally
RUN npm install -g pm2

# Copy frontend package files and install dependencies
COPY ./frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy frontend source files
COPY ./frontend ./

# Build Angular application
RUN npm run build

# Go back to app directory
WORKDIR /app

# Copy server package.json and install dependencies
COPY ./server/package*.json ./server/
WORKDIR /app/server
RUN npm install

# Copy server files
WORKDIR /app
COPY ./server ./server

# Install Cloudflare tunnel
RUN curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
RUN dpkg -i cloudflared.deb

# Copy startup script
COPY ./start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose port
EXPOSE 8006

# Run startup script
CMD ["/app/start.sh"]