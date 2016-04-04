var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

var q = require('q');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

angular
  .module('SOMETHINGApp', [])
  .controller('UserController', userController);

module.exports = function(mongoose){
  var CourseSchema = require('./user.schema.server.js')(mongoose);
  var courseModel = mongoose.model("courseModel", CourseSchema);

  var courses = require("./user.mock.json");

  var service = {
      createUser: createUser,
      findAllUsers: findAllUsers, 
      findByUserById: findByUserById,
      updateUser: updateUser,
      deleteUser: deleteUser

  };
  
  return service;

  // this does nothing....delete later

  function CreateAllCourses(){
    courseModel.create(courses, function(err, courses){
        if(err){
            console.log("create all courses errors: " + err);
        }
        else{
            console.log("create all courses successful!");
        }
    });
  }

  
  function findAllUsers() {

    //CreateAllCourses();

    var deferred = q.defer();
    courseModel.find(function(err, users){
        if(err){
            deferred.reject(err);
            console.log("find all users errors: " + err);
        }
        else{
            deferred.resolve(users);
        }
    });
    return deferred.promise;
  }


    function findUserById(userId) {

        var deferred = q.defer();
        courseModel.findById({_id: userId}, function(err, course){
            if(err){
                deferred.reject(err);
            }else{
            deferred.resolve(course);}
        });
        return deferred.promise;
    }

    function findCourseByTitle(title) {

        var deferred = q.defer();
        courseModel.findOne({title: title}, function(err, courses){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(courses);
            }
        });
        return deferred.promise;
    }

    function deleteCourseById(courseId) {
        var deferred = q.defer();
        courseModel.remove({_id: courseId},function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                courseModel.find(function(err, courses){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(courses);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createCourse(newCourse) {
        var deferred = q.defer();
        var newCourse = newCourse;

        courseModel.create(newCourse, function(err, courses){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(courses);
            }
        });

        return deferred.promise;
    }

    function updateCourseById(courseId, courseObj) {

        var deferred = q.defer();

        //delete courseObj._id;
        console.log(courseObj);

        courseModel.update({_id: courseId}, {$set: courseObj}, function(err, course) {
            if(err){deferred.reject(err);}
            else{
                courseModel.find(function(err, courses){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(courses);
                    }
                });
            }
        });

        return deferred.promise;
    }

}

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


// --------------------------------------------------------------------------------- //
// FOLLOW THIS MODEL
// --------------------------------------------------------------------------------- //

var q = require("q");

module.exports = function(mongoose, db){

    var CourseSchema = require('./course.schema.server.js')(mongoose);
    var courseModel = mongoose.model("courseModel", CourseSchema);

    var courses = require("./course.mock.json");

    var api = {
        findAllCourses : findAllCourses,
        findCourseById : findCourseById,
        createCourse : createCourse,
        deleteCourseById : deleteCourseById,
        updateCourseById : updateCourseById,
        findCourseByTitle : findCourseByTitle
    };
    return api;

    function CreateAllCourses(){
        courseModel.create(courses, function(err, courses){
            if(err){
                console.log("create all courses errors: " + err);
            }
            else{
                console.log("create all courses successful!");
            }
        });
    }

    function findAllCourses() {

        //CreateAllCourses();

        var deferred = q.defer();
        courseModel.find(function(err, courses){
            if(err){
                deferred.reject(err);
                console.log("find all courses errors: " + err);
            }
            else{
                deferred.resolve(courses);
            }
        });
        return deferred.promise;
    }

    function findCourseById(courseId) {

        var deferred = q.defer();
        courseModel.findById({_id: courseId}, function(err, course){
            if(err){
                deferred.reject(err);
            }else{
            deferred.resolve(course);}
        });
        return deferred.promise;
    }

    function findCourseByTitle(title) {

        var deferred = q.defer();
        courseModel.findOne({title: title}, function(err, courses){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(courses);
            }
        });
        return deferred.promise;
    }

    function deleteCourseById(courseId) {
        var deferred = q.defer();
        courseModel.remove({_id: courseId},function(err, users){
            if(err){
                deferred.reject(err);
            }
            else{
                courseModel.find(function(err, courses){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(courses);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createCourse(newCourse) {
        var deferred = q.defer();
        var newCourse = newCourse;

        courseModel.create(newCourse, function(err, courses){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(courses);
            }
        });

        return deferred.promise;
    }

    function updateCourseById(courseId, courseObj) {

        var deferred = q.defer();

        //delete courseObj._id;
        console.log(courseObj);

        courseModel.update({_id: courseId}, {$set: courseObj}, function(err, course) {
            if(err){deferred.reject(err);}
            else{
                courseModel.find(function(err, courses){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(courses);
                    }
                });
            }
        });

        return deferred.promise;
    }
};



