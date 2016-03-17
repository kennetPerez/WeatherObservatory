app.controller('LoginController', function ($scope, LoginService, Auth) {

    $scope.email = "";
    $scope.pass = "";

    $scope.userData = [];

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
});
