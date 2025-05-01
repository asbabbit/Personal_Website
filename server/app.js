// app.js - Main server file with on-demand startup
// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Create Express application
const app = express();
const PORT = process.env.PORT || 8006;

// Server state
let serverActive = false;
let serverTimeout;
const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from Angular build
app.use(express.static(path.join(__dirname, '../frontend/dist/resume')));

// Wake up server on any request
app.use((req, res, next) => {
  console.log(`Server received request at ${new Date().toISOString()}`);
 
  // Wake up server if it's not active
  if (!serverActive) {
    startServer();
  }
 
  // Reset timeout
  resetServerTimeout();
 
  next();
});

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resume_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connection established');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
}

// API routes go here
// Example: app.use('/api/data', require('./routes/data'));

// Catch all other routes and return the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/resume/index.html'));
});

// Function to start the server
async function startServer() {
  console.log('Starting server...');
  serverActive = true;
 
  // Connect to MongoDB
  const connected = await connectToMongoDB();
  if (!connected) {
    console.log('Failed to connect to MongoDB, but continuing...');
  }
 
  console.log('Server is now active');
  resetServerTimeout();
}

// Function to put server to sleep
function sleepServer() {
  console.log('Putting server to sleep...');
  serverActive = false;
 
  // Close MongoDB connection
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
 
  console.log('Server is now sleeping');
}

// Reset timeout for server sleep
function resetServerTimeout() {
  clearTimeout(serverTimeout);
  serverTimeout = setTimeout(sleepServer, TIMEOUT_DURATION);
  console.log(`Server timeout reset. Will sleep in ${TIMEOUT_DURATION/60000} minutes of inactivity`);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('Server is in sleep mode. Will wake up on first request.');
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