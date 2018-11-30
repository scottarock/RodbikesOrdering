const express = require('express');
const parser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

require('./server/config/database');

app
  .use(parser.urlencoded({ extended: true }))
  .use(parser.json())
  .use(function(request, response, next) {
      console.log(`request coming in for ${request.url}`);
      next();
    })
  .use(express.static(path.join(__dirname, 'dist/public')))
  .use('/api', require('./server/routes'))
  .use(require('./server/routes/catch-all.routes'))
  .listen(port, () => { console.log(`server listening on port ${port}`) });
