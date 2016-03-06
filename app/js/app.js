var app = angular.module('weatherObservatory', ['ngRoute'])

.constant('API_URL', 'http://127.0.0.1:8000/WeatherObservatory/api/public/index.php/')

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
