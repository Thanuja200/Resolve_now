const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Electricity', 'Water', 'Road', 'Internet'],
      message: '{VALUE} is not a valid category'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: {
      values: ['Low', 'Medium', 'High'],
      message: '{VALUE} is not a valid priority'
    },
    default: 'Medium'
  },
  status: {
    type: String,
    enum: {
      values: ['Pending', 'In Progress', 'Resolved'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Complaint', complaintSchema); 