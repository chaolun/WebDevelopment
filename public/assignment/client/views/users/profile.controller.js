(function(){
  angular
    .module("", [])
    .controller("ProfileController", profileController);

  function profileController($scope, $http){
    $http.get('/rest/user')
      .success(function(response){
        $scope.users = response;
      });
  }


})();