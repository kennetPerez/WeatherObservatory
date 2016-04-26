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
        console.log(data)
        });


    $scope.showDetail = function (e, station) {
        $scope.station = station;
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
        } else if (idService === 3) {
            return 'Forecast';
        } else {
            return 'Ninguno';
        }
    }

    return filter;
});
