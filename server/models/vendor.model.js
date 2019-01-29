const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema({

  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'name is required'],
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  accountNum: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: function(value) {
        return ( !value || validator.isEmail(value) );
      },
      message: mail => `"${mail.value}" is not a valid email`,
    }
  },
  webAddress: {
    type: String,
    trim: true,
  },
  webSignon: {
    type: String,
    trim: true,
  },
  webPassword: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },

});

vendorSchema.plugin(uniqueValidator, { message: 'A vendor with that name already exists.' });

module.exports = mongoose.model('Vendor', vendorSchema);
