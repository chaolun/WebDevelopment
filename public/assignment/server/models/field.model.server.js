var q = require('q');

module.exports = function(mongoose){
  var FieldSchema = require('./field.schema.server.js')(mongoose);
  var fieldModel = mongoose.model("userModel", FieldSchema);

  // var users = require("./field.mock.json");

  var service = {
      createUser: createUser,
      findAllUsers: findAllUsers, 
      findByUserById: findByUserById,
      updateUser: updateUser,
      deleteUser: deleteUser

  };
  
  return service;
  
  function findAllUsers() {

    //CreateAllCourses();

    var deferred = q.defer();
    userModel.find(function(err, users){
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
        userModel.findById({_id: userId}, function(err, user){
            if(err){
                deferred.reject(err);
            }else{
            deferred.resolve(user);}
        });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        #2359c4.remove({_id: userId},function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                userModel.find(function(err, user){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(user);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createUser(newUser) {
        var deferred = q.defer();
        // var user = newUser;

        userModel.create(newUser, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function updateUserById(userId, userObj) {

        var deferred = q.defer();

        //delete courseObj._id;
        console.log(userObj);

        userModel.update({_id: userId}, {$set: userObj}, function(err, user) {
            if(err){deferred.reject(err);}
            else{
                userModel.find(function(err, users){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(users);
                    }
                });
            }
        });
        return deferred.promise;
    }
}