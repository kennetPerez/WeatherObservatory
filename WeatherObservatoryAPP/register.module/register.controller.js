angular.module('WeatherApp').controller('RegisterController', function ($rootScope, $scope, $timeout, RegisterService, Auth) {
    $scope.$on('$viewContentLoaded', function () {
        App.initAjax(); // initialize core components
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_profile')); // set profile link active in sidebar menu
    });


    $scope.user = {
        'email': "",
        name: "",
        type: 1,
        pass: ""
    };

    $scope.incorrectEmail = false;
    $scope.incorrectRegister = false;

    $scope.register = function () {
        $scope.incorrectEmail = false;
        RegisterService.register($scope.user)
            .then(function (data) {
                if (data !== undefined) {
                    Auth.login(data);
                } else {
                    $scope.incorrectRegister = true;
                    $timeout(function () {
                        $scope.incorrectRegister = false;
                    }, 3000);
                }
            })
            .catch(function (err) {
                $scope.incorrectEmail = true;
            });
    }


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = true;
});
