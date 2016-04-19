(function(){
  angular
  .module("FormBuilderApp", [])
  .factory("UserService", userService);

  function userService($http, $q){
    var service = {
      createUser: createUser,
      findAllUsers: findAllUsers, 
      findByUserById: findByUserById,
      updateUser: updateUser,
      deleteUser: deleteUser,
      findUserByUsername: findUserByUsername

    };

    return service;

    function createUser(user){
      var deferred = $q.defer();
      $http.post('/rest/user/', user)
      .success(function(user){
        deferred.resolve(user);
      });
      return deferred.promise; 
    }


    function findAllUsers(){
      var deferred = $q.defer();
      $http.get('/rest/user')
      .success(function(user){
        deferred.resolve(user);
      });
      return deferred.promise;
    }

    
    function findUserByUsername(username){
      var deferred = $q.defer();
      $http.get('/rest/user/' + username)
      .success(function(user){
        deferred.resolve(user);
      });
      return deferred.promise;
    }
    
    function updateUser(id, user){
      var deferred = $q.defer();
      $http.put('/rest/user/' + id, user)
      .success(function(user){
        deferred.resolve(user);
      }); 
      return deferred.promise;
    }

    function deleteUser(id){
      var deferred = $q.defer();
      $http.delete('/rest/user/' + id)
      .success(function(user){
        deferred.resolve(user);
      });
      return deferred.promise;
    }

    function findUserByCredentials(username, password){
      var deferred = $q.defer();
      $http.get('/rest/user/credentials/' + username + '&' + password)
      .success(function(user){
        deferred.resolve(user);
      });
      return deferred.promise;
    }
  }
})();