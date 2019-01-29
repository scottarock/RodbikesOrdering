const Vendor = require('mongoose').model('Vendor');

module.exports = {

  // need to add populate() to get orders

  index(request, response) {
    Vendor.find({})
      .then( vendors => response.json(vendors) )
      .catch( console.log );
  },

  create(request, response) {
    Vendor.create(request.body)
      .then( vendor => response.json(vendor) )
      .catch( error => {
        // assuming mongoose validation errors
        response
          .status(422)
          .json(Object.keys(error.errors).map(key => error.errors[key].message));
      });
  },

  show(request, response) {
    Vendor.findById(request.params.vendorId)
      .then( vendor => response.json(vendor) )
      .catch( console.log );
  },

  update(request, response) {
    Vendor.findByIdAndUpdate(request.params.vendorId, { $set: request.body }, { new: true })
      .then( vendor => response.json(vendor) )
      .catch( error => {
        // assuming mongoose validation errors
        response
          .status(422)
          .json(Object.keys(error.errors).map(key => error.errors[key].message));
      });
  },

  delete(request, response) {
    Vendor.findByIdAndRemove(request.params.vendorId)
      .then( vendor => response.json(vendor) )
      .catch( console.log );
  }

}
