#!/bin/bash
# start.sh - Startup script for Angular, Node.js, and Cloudflare Tunnel

# Set up error handling
set -e
echo "Starting application services..."

# Check if Angular application exists and build it
if [ -f /app/frontend/angular.json ]; then
  echo "Building Angular application..."
  cd /app/frontend
  ng build --configuration production
else
  echo "Frontend not initialized. Creating a placeholder frontend..."
  mkdir -p /app/frontend/dist/resume
  # Create a simple index.html file
  cat > /app/frontend/dist/resume/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <title>Resasdfplication</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      text-align: center;
    }
    .message {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin-top: 50px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <h1>Reasdf Application</h1>
  <div class="message">
    <h2>Frontend Not Initialized</h2>
    <p>The Angular application has not been initialized yet.</p>
    <p>Please follow these steps to set up your frontend:</p>
    <ol style="text-align: left; max-width: 600px; margin: 0 auto;">
      <li>Connect to your Docker container: <code>docker-compose exec app bash</code></li>
      <li>Navigate to the frontend directory: <code>cd /app/frontend</code></li>
      <li>Initialize a new Angular project: <code>ng new . --routing --skip-git</code></li>
      <li>Build the application: <code>ng build</code></li>
    </ol>
  </div>
</body>
</html>
EOF
  echo "Created placeholder frontend."
fi

# Start Node.js server with PM2
echo "Starting Node.js server with PM2..."
cd /app/server
pm2 start app.js --name "resume-server" --no-autorestart --watch --exp-backoff-restart-delay=100 --listen-timeout 5000

# Ensure app is listening on all interfaces
sed -i 's/app.listen(PORT,/app.listen(PORT, "0.0.0.0",/g' /app/server/app.js

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