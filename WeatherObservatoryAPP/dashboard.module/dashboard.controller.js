angular.module('WeatherApp')

    .controller('DashboardController', function ($scope, $http, NgMap, DashboardService,StationService, WondergroundService, ApixuService) {

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

    $scope.condition = {}

    $scope.showDetail = function (e, station) {
        $scope.station = station;

        if (station.id === 1) {
            ApixuService.get(station.lat, station.lon).then(function (data) {
                $scope.condition = data;
                //StationService.addAstroInfo(data.astronomic);
            });
        }
        else if (station.id === 2) {
            WondergroundService.get(station.lat, station.lon).then(function (data) {
                $scope.condition = data;
                //StationService.addClimeInfo(data.climate)
            });
        }

        $scope.map.showInfoWindow('foo-iw', station.id.toString());
    };

    $scope.hideDetail = function () {
        $scope.map.hideInfoWindow('foo-iw');
    };

})


    .filter("filterNameService", function () {
    var filter = function (idService) {
        if (idService === 1) {
            return 'Apixu';
        } else if (idService === 2) {
            return 'Wunderground';
        }
    }

    return filter;
});
