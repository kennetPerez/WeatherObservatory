var app = angular.module('weatherObservatory', ['ngRoute', 'ngCookies'])

.constant('API_URL', 'http://localhost:8000/WeatherObservatory/WeatherObservatory/public/index.php/api/v1/')

.config(config)

.factory('Auth', auth)

.run(function ($rootScope, Auth) {
    $rootScope.$on('$routeChangeStart', function () {
        Auth.checkStatus();
    })
});


function config($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "LoginController",
            templateUrl: "Login.module/login.html"
        })
        .when("/logged", {
            controller: "LoggedController",
            templateUrl: "Login.module/Logged.html"
        })
        .when("/register", {
            controller: "RegisterController",
            templateUrl: "People.module/Register/register.html"
        })
        .otherwise({
            redirectTo: "/"
        });
}


function auth($cookies, $location) {
    return {
        login: login,

        logout: logout,

        checkStatus: check
    }

    function login(data) {
        $cookies.putObject('userData', data);
        $location.path("/logged");
    }

    function logout() {
        $cookies.remove('userData');
        $location.path("/");
    }

    function in_array(needle, haystack) {
        var key = '';
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
        return false;
    }

    function check() {
        var privateRoutes = ["/logged"];
        var userData = $cookies.getObject('userData');

        if (in_array("/", privateRoutes) && typeof (userData) == "undefined") {
            $location.path("/");
        }

        if (in_array("/register", privateRoutes) && typeof (userData) == "undefined") {
            $location.path("/register");
        }

        if (in_array("/logged", privateRoutes) && typeof (userData) != "undefined" && userData.type === 0) {
            $location.path("/logged");
        }
    }
}
