const itemRoutes = require('./item.routes');
const vendorRoutes = require('./vendor.routes');
const router = require('express').Router();

module.exports = router
  .use('/items', itemRoutes)
  .use('/vendors', vendorRoutes);
