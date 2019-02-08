const router = require('express').Router();
const { orderController } = require('../controllers');

module.exports = router
  .get('/', orderController.index)
  .post('/', orderController.create)
  .get('/:orderId', orderController.show)
  .post('/:orderId', orderController.update)
  .delete('/:orderId', orderController.delete);
