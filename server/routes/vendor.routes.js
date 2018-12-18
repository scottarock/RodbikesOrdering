const router = require('express').Router();
const { vendorController } = require('../controllers');

module.exports = router
  .get('/', vendorController.index)
  .post('/', vendorController.create)
  .get('/:vendorId', vendorController.show)
  .post('/:vendorId', vendorController.update)
  .delete('/:vendorId', vendorController.delete);
