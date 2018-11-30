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
  vendor: {
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
  department: {
    type: String,
    trim: true,
  },
  specialOrder: {
    type: String,
    trim: true,
    default: false,
  },
  customer: {
    type: String,
    trim: true,
  }

});

module.exports = mongoose.model('Item', itemSchema);
