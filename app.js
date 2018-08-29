'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var bodyPaser = require('body-parser')
var YAML = require('yamljs');
var yaml_json = YAML.load('./api/swagger/swagger.yaml');
var swaggerTools = require('swagger-tools');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PostApp')

app.use(bodyPaser.urlencoded({extended:true}));
app.use(bodyPaser.json())
var serverPort = 4200;
var options = {
  controllers:'./api/controllers',
  useStubs:false
}
swaggerTools.initializeMiddleware(yaml_json, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  app.listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  });
});