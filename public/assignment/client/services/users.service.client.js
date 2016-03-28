(function(){
  angular
    .module("", [])
    .factory("UserService", userService);

  function userService($scope, $http){
    var service = {
      createUser: createUser,
      findAllUsers: findAllUsers, 
      findByUserById: findByUserById,
      updateUser: updateUser,
      deleteUser: deleteUser

    };
  
    return service;

    function createUser(user, callback){
      $http
        .post('/rest/user/', user)
        .success(callback);
    }


    function findAllUsers(callback){

      $http
        .get('/rest/user')
        .success(callback);
    }

    
    function findUserByUsername(username,callback){
      $http
        .get('/rest/user/' + username)
        .success(callback);
    
    }
    
    function updateUser(id, user, callback){
      $http
        .put('/rest/user/' + id, user)
        .success(callback); 
    }

    function deleteUser(callback){
      
    }

    function findUserByCredentials(callback){
      $http
        .get('/rest/user')
        .success(callback);
    }
  }

})();