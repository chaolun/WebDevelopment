var app = angular.module('FormBuilderApp', []);
app.controller("FormBuilderController", formBuilderController);

function formBuilderController($scope){
	$scope.hello = 'hello world text';
}
app.controller('WidgetsController', function($scope) {});


app.controller('SideBarController', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
});