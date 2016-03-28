var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

angular
  .module('SOMETHINGApp', [])
  .controller('UserController', userController);


function userController($scope, $http, UserService){
  UserService.createUser();
  UserService.findAllUsers();
  UserService.findUsersById();
  UserService.updateUser();
  UserService.deleteUser();

  $scope.createUser = createUser;
  $scope.findAllUsers = findAllUsers;
  $scope.findUsersById = findUsersById;
  $scope.updateUser = updateUser;
  $scope.deleteUser = deleteUser;


}





