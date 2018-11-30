const Item = require('mongoose').model('Item');

module.exports = {

  index(request, response) {
    Item.find({})
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
