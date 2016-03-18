app.controller('LoginController', function ($scope, $location, LoginService, Auth) {

    $scope.email = "";
    $scope.pass = "";


    $scope.login = function () {
        LoginService.login($scope.email, $scope.pass)
            .then(function (data) {
                if (data !== undefined) {
                    Auth.login(data);
                } else {
                    alert("Invalid.")
                }
            });
    }

    $scope.register = function () {
        $location.path("/register");
    }
});
