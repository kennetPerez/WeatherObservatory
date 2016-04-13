/*angular.module('WeatherApp').controller('DashboardController', function(MarkerCreatorService, $scope, $http) {

    $scope.$on('$viewContentLoaded', function() {
        App.initAjax(); // initialize core components
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_home')); // set profile link active in sidebar menu
    });

    $scope.list = [
        {
        'lat': 10.741173858409025,
        'lon': -84.57046882656255,
        'n': "estacion1"
    }, {
        'lat': 9.529931587524796,
        'lon': -83.21915046718755,
        'n': "estacion2"
    }, {
        'lat': 8.607777472504743,
        'lon': -83.58169929531255,
        'n': "estacion3"
    }, {
        'lat': 9.973861218719904,
        'lon': -83.07632820156255,
        'n': "estacion4"
    }];

    $scope.onClick = function () {
        console.log("cristian");
    }

    function cargarEstaciones() {
        $scope.list.forEach(function (estacion) {
            MarkerCreatorService.createByCoords(estacion.lat, estacion.lon, function (marker) {
                marker.options.labelContent = estacion.n;
                $scope.map.markers.push(marker);
            });
        });
    }

    $scope.address = '';

    $scope.map = {
        center: {
            latitude: 10.741173858409025,
            longitude: -84.57046882656255
        },
        zoom: 8,
        markers: [],
        control: {},
        options: {
            scrollwheel: true
        }
    };

    $scope.addCurrentLocation = function () {
        MarkerCreatorService.createByCurrentLocation(function (marker) {
            marker.options.labelContent = 'You´re here';
            $scope.map.markers.push(marker);
            refresh(marker);
        });
    };

    $scope.addAddress = function () {
        var address = $scope.address;
        if (address !== '') {
            MarkerCreatorService.createByAddress(address, function (marker) {
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        }
    };

    function refresh(marker) {
        $scope.map.control.refresh({
            latitude: marker.latitude,
            longitude: marker.longitude
        });
    }

    cargarEstaciones();
});*/



angular.module('WeatherApp').controller('DashboardController', function($scope, $http, NgMap) {

    $scope.$on('$viewContentLoaded', function() {
        App.initAjax(); // initialize core components
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_home')); // set profile link active in sidebar menu
    });


    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });


    $scope.stations = [
        {id:'1', service: "APIXU", name: 'Observatorio Santa Rosa', position:[10.741173858409025,-84.57046882656255]},
        {id:'2', service: "Wonderground", name: 'Observatorio Telire', position:[9.529931587524796,-83.21915046718755]}
    ];

    $scope.showDetail = function(e, shop) {
        $scope.shop = shop;
        $scope.map.showInfoWindow('foo-iw', shop.id);
    };

    $scope.hideDetail = function() {
        $scope.map.hideInfoWindow('foo-iw');
    };


});
