var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


var users = [
  {"_id": 123, "firstName": "Alice",  "lastName": "Wonderland", "username": "alice",  "password": "alice"},
  {"_id": 234, "firstName": "Bob",  "lastName": "Hope",     "username": "bob",  "password": "bob"},
  {"_id": 345, "firstName": "Charlie","lastName": "Brown",    "username": "charlie", "password": "charlie"},
  {"_id": 456, "firstName": "Dan",  "lastName": "Craig",    "username": "dan",  "password": "dan"},
  {"_id": 567, "firstName": "Edward","lastName": "Norton",    "username": "ed", "password": "ed"}
];

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

  function createUser(user){
  	UserService.createUser(user, renderUsers);
  }

  function findAllUsers(){

  }

  function findUsersById(){

  }

  function updateUser(){

  }

  function deleteUser(id){
  	UserService.deleteUser(id, renderUsers);
  }

}

// get all users
app.get("/rest/user", function(req, res){
  res.send(users);};
});


// get user by id
app.get("/rest/user/:username" , function(req,res){
	var id = req.body;
	var result = users.filter(function( obj ) {
	return obj._username == username;
	});
	res.json(result);

});

// add new users
app.post("/rest/user", function(req, res){
	var user = req.body;
	users.push(user);
	res.json(users);
});

// delete user
// naieve delete 
app.delete('/rest/user', function(req, res){

 
});

// update user
app.put('/rest/user/:id', function(req, res){
	var id = req.params['id'];
	var user = req.body;
	users[id].firstName =user.firstName;
	users[id].lastName = user.lastName;
	users[id].username = user.username;
	users[id].password = user.password;
	res.json(users);
});