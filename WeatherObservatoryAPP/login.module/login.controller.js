angular.module('WeatherApp').controller('LoginController', function ($rootScope, $scope, $timeout, LoginService, Auth) {
    $scope.$on('$viewContentLoaded', function () {
        App.initAjax(); // initialize core components
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_profile')); // set profile link active in sidebar menu
    });

    $scope.incorrectLogin = false;

    $scope.email = "";
    $scope.pass = "";


    $scope.login = function () {
        LoginService.login($scope.email, $scope.pass)
            .then(function (data) {
                if (data !== undefined) {
                    Auth.login(data);
                } else {
                    $scope.incorrectLogin = true;
                    $timeout(function () {
                        $scope.incorrectLogin = false;
                    }, 3000);
                }
            });
    }


    $scope.enterLogin = function (e) {
        if (e.keyCode === 13) {
            $scope.login();
        }
    }


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = true;
});
