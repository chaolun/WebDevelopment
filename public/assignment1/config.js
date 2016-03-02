(function(){
    angular
        .module("FormBuilderApp", ['ngRoute'])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: 'SideBarController',
                    activetab: 'home'
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: 'SideBarController',
                    activetab: 'profile'
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: 'SideBarController',
                    activetab: 'admin'
                })
                .when("/forms", {
                    templateUrl: 'views/forms/forms.view.html',
                    controller: 'SideBarController',
                    activetab: 'forms'
                })
                .when("/form-fields", {
                    templateUrl: 'views/forms/form-fields.view.html',
                    controller: 'SideBarController',
                    activetab: 'forms'
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