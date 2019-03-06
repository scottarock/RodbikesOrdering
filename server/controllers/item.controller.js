const Item = require('mongoose').model('Item');
const queryParams = require('api-query-params');

module.exports = {

  // need to add populate() to get order and vendor data

  index(request, response) {
    // get any query parameters from the api request
    const { filter, sort, projection } = queryParams(request.query);
    // use the query object to find items requested
    Item.find(filter)
      .sort(sort)
      .select(projection)
      .then( items => response.json(items) )
      .catch( console.log );
  },

  create(request, response) {
    Item.create(request.body)
      .then( item => response.json(item) )
      .catch( error => {
        // assuming mongoose validation errors
        response
          .status(422)
          .json(Object.keys(error.errors).map(key => error.errors[key].message));
      });
  },

  show(request, response) {
    Item.findById(request.params.itemId)
      .then( item => response.json(item) )
      .catch( console.log );
  },

  update(request, response) {
    Item.findByIdAndUpdate(request.params.itemId, { $set: request.body }, { new: true })
      .then( item => response.json(item) )
      .catch( error => {
        // assuming mongoose validation errors
        response
          .status(422)
          .json(Object.keys(error.errors).map(key => error.errors[key].message));
      });
  },

  delete(request, response) {
    Item.findByIdAndRemove(request.params.itemId)
      .then( item => response.json(item) )
      .catch( console.log );
  },

}
