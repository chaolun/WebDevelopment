(function(){
    angular
        .module("FormBuilderApp", ['ngRoute'])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: 'FormBuilderController'
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"
                })
                .when("/forms", {
                    templateUrl: 'views/forms/forms.view.html'
                })
                .when("/form-fields", {
                    templateUrl: 'views/forms/form-fields.view.html'
                })
                .otherwise({
                    redirectTo: "/"
                });

        })
        .controller("FormBuilderController", function($scope, $location){
           console.log("I am at: " + $location.url);
           $scope.$location = $location;
        });
})();