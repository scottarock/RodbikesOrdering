const itemRoutes = require('./item.routes');
const orderRoutes = require('./order.routes');
const vendorRoutes = require('./vendor.routes');
const router = require('express').Router();

module.exports = router
  .use('/items', itemRoutes)
  .use('/orders', orderRoutes)
  .use('/vendors', vendorRoutes);
