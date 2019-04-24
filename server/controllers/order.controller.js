const Order = require('mongoose').model('Order');
const queryParams = require('api-query-params');

module.exports = {

  index(request, response) {
    // get query parameters from the api request
    const { filter, skip, limit, sort, projection } = queryParams(request.query);
    // use the query object to find orders requested
    Order.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(projection)
      .populate('items')
      .then( orders => {
        response.json(orders)
      } )
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
      .populate()
      .then( order => response.json(order) )
      .catch( console.log );
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
