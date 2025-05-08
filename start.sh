#!/bin/bash
# start.sh - Startup script for Node.js server and Cloudflare Tunnel
# Set up error handling
set -e
echo "Starting application services..."

# Define base paths based on the project structure
RESUME_DIR="/app"
FRONTEND_DIR="${RESUME_DIR}/frontend"
SERVER_DIR="${RESUME_DIR}/server"

echo "Project structure:"
echo "- Resume directory: ${RESUME_DIR}"
echo "- Frontend directory: ${FRONTEND_DIR}"
echo "- Server directory: ${SERVER_DIR}"

# Make sure Angular build directory exists
if [ ! -d "${FRONTEND_DIR}/dist" ]; then
  echo "ERROR: Angular build directory not found at ${FRONTEND_DIR}/dist"
  echo "The Angular application must be built during the Docker image creation"
  exit 1
fi

echo "Using Angular built files from: ${FRONTEND_DIR}/dist"

# Start Node.js server with PM2
echo "Starting Node.js server with PM2..."
cd "${SERVER_DIR}"

# Ensure app is listening on all interfaces
if grep -q "app.listen(PORT" app.js && ! grep -q "app.listen(PORT, \"0.0.0.0\"" app.js; then
  echo "Configuring server to listen on all interfaces..."
  sed -i 's/app.listen(PORT,/app.listen(PORT, "0.0.0.0",/g' app.js
fi

# Start the server with PM2
pm2 start app.js --name "resume-server" --no-autorestart --watch --exp-backoff-restart-delay=100 --listen-timeout 5000

# Check if CLOUDFLARE_TOKEN is set
if [ -z "$CLOUDFLARE_TOKEN" ]; then
    echo "CLOUDFLARE_TOKEN environment variable is not set. Skipping Cloudflare tunnel setup."
else
    # Start Cloudflare tunnel with token directly
    echo "Starting Cloudflare tunnel with token..."
    cloudflared tunnel run --token "$CLOUDFLARE_TOKEN" &
    TUNNEL_PID=$!
    echo "Cloudflare tunnel started with PID: $TUNNEL_PID"
fi

# Monitor the application
echo "Application startup complete"
echo "Monitoring logs..."

# Keep container running and capture signals
trap "echo 'Shutting down services...'; pm2 stop all; kill $TUNNEL_PID 2>/dev/null; exit 0" SIGTERM SIGINT

# Monitor PM2 logs
pm2 logs --lines 10 &

# Keep container running
tail -f /dev/null