const itemRoutes = require('./item.routes');
const router = require('express').Router();

module.exports = router
  .use('/items', itemRoutes);
