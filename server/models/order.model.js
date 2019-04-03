const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({

  poNumber: {
    type: Number,
    unique: true,
    required: [true, 'purchase order number is required'],
  },
  vendorName: {
    type: String,
    trim: true,
    required: [true, 'vendor name is required'],
  },
  status: {
    type: String,
    trim: true,
    default: 'Ordered',
    enum: [
      'Ordered',
      'Pending',
      'Partially Received',
      'Fully Received'
    ],
  },
  dateOrdered: {
    type: Date,
  },
  orderNumber: {
    type: String,
    trim: true,
  },
  shippingCost: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
    trim: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    }
  ]

});

orderSchema.plugin(uniqueValidator, { message: 'PO number is already in use' });

module.exports = mongoose.model('Order', orderSchema);
