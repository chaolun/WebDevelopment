var express = require("express");
var app = express();

var q = require('q');

angular
  .module('FormBuilderApp', [])
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

    function deleteUserById(userId) {
        var deferred = q.defer();
        courseModel.remove({_id: userId},function(err, users){
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

    function createUser(newUser) {
        var deferred = q.defer();
        // var user = newUser;

        courseModel.create(newUser, function(err, courses){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(courses);
            }
        });

        return deferred.promise;
    }

    function updateUserById(userId, userObj) {

        var deferred = q.defer();

        //delete courseObj._id;
        console.log(userObj);

        courseModel.update({_id: userId}, {$set: userObj}, function(err, course) {
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
