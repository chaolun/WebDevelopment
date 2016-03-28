(function() {
  var app = angular.module('FormBuilderApp', []);


  app.controller("MainController", mainController);

  function mainController($scope, $location, $route){
    $scope.hello = 'hello world text';
    $scope.$route = $route;
  }

})();