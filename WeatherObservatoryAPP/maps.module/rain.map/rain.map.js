angular.module('WeatherApp',["leaflet-directive"]).controller('MapsRainController', function($rootScope, $scope, $http, $timeout) {

    angular.extend($scope, {
                center: {
                    lat: 9.953,
                    lng: -84.479,
                    zoom: 8
                },
                layers: {
                    baselayers:{
                                xyz: {
                                        name: 'Rain',
                                        url: 'http://{s}.maps.owm.io/current/RAIN_STYLE/{z}/{x}/{y}?appid=b1b15e88fa797225412429c1c50c122a',
                                        type: 'xyz'
                                    }
                    }
                }
            });
    
});
