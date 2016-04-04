var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


var userModel = require('./models/user.model.server.js')(mongoose);
require('./services/user.service.server.js')(app, userModel);

var formModel = require('./models/form.model.server.js')(mongoose);
require('./services/form.model.server.js/')(app, formModel);

var users = [
  {"_id": 123, "firstName": "Alice",  "lastName": "Wonderland", "username": "alice",  "password": "alice"},
  {"_id": 234, "firstName": "Bob",  "lastName": "Hope",     "username": "bob",  "password": "bob"},
  {"_id": 345, "firstName": "Charlie","lastName": "Brown",    "username": "charlie", "password": "charlie"},
  {"_id": 456, "firstName": "Dan",  "lastName": "Craig",    "username": "dan",  "password": "dan"},
  {"_id": 567, "firstName": "Edward","lastName": "Norton",    "username": "ed", "password": "ed"}
];

angular
  .module('FormBuilderApp', [])
  .controller('UserController', userController);



