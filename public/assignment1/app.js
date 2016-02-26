(function() {
  var app = angular.module('FormBuilderApp', []);


  app.controller("FormBuilderController", formBuilderController);

  function formBuilderController($scope){
    $scope.hello = 'hello world text';

  }

})();