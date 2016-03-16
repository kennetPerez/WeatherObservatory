var app = angular.module('weatherObservatory', ['ngRoute'])

.constant('API_URL', 'http://localhost:8000/WeatherObservatory/WeatherObservatory/public/index.php/api/v1/')

.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "homeController",
            templateUrl: "views/home.html"
        })
        .otherwise({
            redirectTo: "/"
        });
})

;
