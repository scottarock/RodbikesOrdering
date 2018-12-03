const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const jsFileReg = new RegExp('\\.js$', 'i');
const modelsPath = path.resolve('server/models');

mongoose.connect(
  'mongodb://localhost:27017/orders',
  { useNewUrlParser: true }
);
mongoose.connection.on('connected', () => { console.log('connected to mongodb') });

fs.readdirSync(modelsPath).forEach( file => {
  if ( jsFileReg.test(file) ) {
    require(path.join(modelsPath, file));
  }
});
