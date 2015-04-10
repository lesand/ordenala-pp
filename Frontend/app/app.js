// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('baleadapp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar' ,'uiGmapgoogle-maps']);

app.config(function ($routeProvider) {


    /* $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('app.home', {
      url: "/home",
      templateUrl: "views/home.html",
      controller: "HomeController"
    })
    .state('app.principal', {
      url: "/principal",
      templateUrl: "view/principal.html",
      controller: "PrincipalController"      
    });
*/
    $routeProvider.when("/home", {
        controller: "HomeController",
        templateUrl: "/views/home.html"
    });

     $routeProvider.when("/principal", {
        controller: "PrincipalController",
        templateUrl: "/views/principal.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

});

var serviceBase = 'http://localhost:26264/';
//var serviceBase = 'http://192.168.1.147/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

/*app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);
*/
