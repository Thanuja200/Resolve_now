const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const complaintsRouter = require('./routes/complaints');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('ResolveNow API is running');
});

// Mount routes
app.use('/api/complaints', complaintsRouter);
app.use('/api/auth', require('./routes/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
