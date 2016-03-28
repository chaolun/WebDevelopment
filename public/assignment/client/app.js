var app = angular.module('FormBuilderApp', []);
app.controller("FormBuilderController", formBuilderController);

function formBuilderController($scope){
	$scope.hello = 'hello world text';
}

app.controller('SideBarController', sideBarController);


function sideBarController($scope, $location) { 
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}