angular.module('WeatherApp').controller('DashboardController', function ($scope, $http, NgMap, DashboardService) {

    $scope.$on('$viewContentLoaded', function () {
        App.initAjax(); // initialize core components
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_home')); // set profile link active in sidebar menu
    });


    NgMap.getMap().then(function (map) {
        $scope.map = map;
    });

    DashboardService.stations()
        .then(function (data) {
            $scope.stations = data;
        });

    /*$scope.stations = [
        {
            id: '1',
            service: "APIXU",
            name: 'Observatorio Santa Rosa',
            position: [10.741173858409025, -84.57046882656255]
        },
        {
            id: '2',
            service: "Wonderground",
            name: 'Observatorio Telire',
            position: [9.529931587524796, -83.21915046718755]
        }
    ];*/

    $scope.showDetail = function (e, station) {
        $scope.station = station;
        $scope.map.showInfoWindow('foo-iw', station.id);
    };

    $scope.hideDetail = function () {
        $scope.map.hideInfoWindow('foo-iw');
    };






});