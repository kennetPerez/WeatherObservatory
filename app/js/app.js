var app = angular.module('weatherObservatory', ['ngRoute'])

.constant('API_URL', 'http://localhost:8000/WeatherObservatory/WeatherObservatory/public/index.php/api/v1/')

.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "LoginController",
            templateUrl: "Login.module/login.html"
        })
        .otherwise({
            redirectTo: "/"
        });
})

;
