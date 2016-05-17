angular.module('WeatherApp')


.controller('DashboardController', function ($rootScope, $scope, $http, NgMap, DashboardService, StationService, WondergroundService, ApixuService) {

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

        $scope.loadingData = true;
        $scope.station = station;
        $scope.condition = {};

        if (station.idService === 1) {
            ApixuService.get(station.lat, station.lon).then(function (data) {
                $scope.condition = data;
                //StationService.addAstroInfo(data.astronomic);

                $scope.loadingData = false;

            });
        } else if (station.idService === 2) {
            WondergroundService.get(station.lat, station.lon).then(function (data) {
                $scope.condition = data;

                //StationService.addClimeInfo(data.climate)

                $scope.loadingData = false;
            });
        }

        $scope.map.showInfoWindow('foo-iw', station.id.toString());
    };

    $scope.hideDetail = function () {
        $scope.map.hideInfoWindow('foo-iw');
    };

    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = false;

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
