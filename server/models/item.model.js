const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({

  description: {
    type: String,
    trim: true,
    required: [true, 'description is required'],
  },
  quantity: {
    type: Number,
    min: [1, 'at least one item must be requested'],
    required: [true, 'quantity is required'],
  },
  requestedBy: {
    type: String,
    trim: true,
    required: [true, 'requested by is required'],
  },
  department: {
    type: String,
    trim: true,
    enum: [
      'Sales',
      'Service',
      'Store Use'
    ]
  },
  specialOrder: {
    type: String,
    trim: true,
    default: 'No',
    enum: [
      'Yes',
      'No'
    ]
  },
  customer: {
    type: String,
    trim: true,
  },
  vendorName: {
    type: String,
    trim: true,
  },
  partNumber: {
    type: String,
    trim: true,
  },
  cost: {
    type: Number,
  },
  price: {
    type: Number,
  },
  shipping: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    trim: true,
    default: 'Wanted',
    enum: [
      'Wanted',
      'Pending',
      'Ordered',
      'Back Ordered',
      'Received',
      'Not Available'
    ],
  },
  requestedOn: {
    type: Date,
    default: Date.now,
  },
  orderedOn: {
    type: Date,
  },
  poNumber: {
    type: Number,
    default: -1,
  },

});

module.exports = mongoose.model('Item', itemSchema);
