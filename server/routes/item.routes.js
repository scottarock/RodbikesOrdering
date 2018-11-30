const router = require('express').Router();
const { itemController } = require('../controllers');

module.exports = router
  .get('/', itemController.index)
  .post('/', itemController.create)
  .get('/:itemId', itemController.show)
  .post('/:itemId', itemController.update)
  .delete('/:itemId', itemController.delete);
