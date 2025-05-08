// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Create Express application
const app = express();
const PORT = process.env.PORT || 8006;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define path for frontend files - look for files in both locations
// This handles different Angular output directory structures
const possiblePaths = [
  path.join(__dirname, '../frontend/dist/frontend'),
  path.join(__dirname, '../frontend/dist')
];

// Find the first path that exists
let angularBuildPath;
for (const checkPath of possiblePaths) {
  try {
    if (require('fs').existsSync(checkPath)) {
      angularBuildPath = checkPath;
      break;
    }
  } catch (err) {
    console.log(`Path ${checkPath} does not exist`);
  }
}

if (!angularBuildPath) {
  console.error("ERROR: Angular build directory not found!");
  process.exit(1);
}

console.log(`Serving Angular from: ${angularBuildPath}`);

// Serve static files from the Angular build
app.use(express.static(angularBuildPath));

// API routes go here
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/resume_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connection established');
}).catch(error => {
  console.error('MongoDB connection error:', error);
  console.log('Continuing without MongoDB connection...');
});

// For all other routes, send the Angular app
// This enables client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(angularBuildPath, 'index.html'));
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close();
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close();
  }
  process.exit(0);
});