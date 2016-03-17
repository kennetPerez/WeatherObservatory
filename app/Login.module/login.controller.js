app.controller('LoginController', function ($scope, LoginService) {

    $scope.user = "";
    $scope.pass = "";

    $scope.userData = [];

    $scope.login = function () {
        LoginService.login($scope.user, $scope.pass)
            .then(function (data) {
                if (data !== undefined) {
                    $scope.userData.push(data);
                } else {
                    alert("Invalid.")
                }
            });
    }


});
