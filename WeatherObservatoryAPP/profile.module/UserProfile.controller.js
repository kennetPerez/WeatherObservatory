angular.module('WeatherApp').controller('UserProfileController', function ($rootScope, $scope, $cookies, Auth) {
    $scope.$on('$viewContentLoaded', function () {
        App.initAjax(); // initialize core components
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_profile')); // set profile link active in sidebar menu
    });

    $scope.user = $cookies.getObject('userData');

    $scope.logout = function () {
        Auth.logout();
    }


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = true;
});
