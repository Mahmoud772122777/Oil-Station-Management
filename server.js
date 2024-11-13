const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27018/fuelStationDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: '*',  // Allow all origins (you can specify your frontend URL here for better security)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // for parsing application/json
app.use(express.static('frontend')); // Serve static files from the 'frontend' directory

// Test route to serve ceoDashboard.html
app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/frontend/ceoDashboard.html');
});

// Import routes
const branchRoutes = require('./routes/branch');
const feedbackRoutes = require('./routes/feedback');
const managerRoutes = require('./routes/manager');
const workerRoutes = require('./routes/worker');
const authRoutes = require('./routes/auth');  // Importing auth route

// Use routes
app.use('/api/branches', branchRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/auth', authRoutes);  // Adding auth route

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
