const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');

// Create a new complaint (for all authenticated users)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    // Validate required fields
    if (!title || !description || !category || !priority) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      name: req.user.name,
      email: req.user.email,
      user: req.user._id
    });

    const savedComplaint = await complaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all complaints (admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    const complaints = await Complaint.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's own complaints
router.get('/my', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching user complaints:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 