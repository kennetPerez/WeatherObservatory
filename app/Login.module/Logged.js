app.controller('LoggedController', function ($scope, $cookies, Auth) {
    $scope.userData = $cookies.getObject('userData');

    $scope.logout = function () {
        Auth.logout();
    }

});
