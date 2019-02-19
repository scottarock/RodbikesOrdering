const Order = require('mongoose').model('Order');

module.exports = {

  index(request, response) {
    // use the query object to find orders requested
    Order.find(request.query)
      .then( orders => response.json(orders) )
      .catch( console.log );
  },

  create(request, response) {
    Order.create(request.body)
      .then( order => response.json(order) )
      .catch( error => {
        // assuming mongoose validation errors
        response
          .status(422)
          .json(Object.keys(error.errors).map(key => error.errors[key].message));
      });
  },

  show(request, response) {
    Order.findById(request.params.orderId)
      .then( order => response.json(order) )
      .carch( console.log );
  },

  update(request, response) {
    Order.findByIdAndUpdate(request.params.orderId, { $set: request.body }, { new: true })
      .then( order => response.json(order) )
      .catch( error => {
        // assumes mongoose validation errors
        response
          .status(422)
          .json(Object.keys(error.errors).map(key => error.errors[key].message));
      });
  },

  delete(request, response) {
    Order.findByIdAndRemove(request.params.orderId)
      .then( order => response.json(order) )
      .catch( console.log );
  },

}