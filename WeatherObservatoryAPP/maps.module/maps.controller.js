angular.module('WeatherApp',["leaflet-directive"]).controller('MapsController', function($rootScope, $scope, $http, $timeout) {
    
    $scope.tiles={xyz: {
                            name: 'Temperature',
                            url: 'http://{s}.maps.owm.io/current/TEMP_STYLE/{z}/{x}/{y}?appid=b1b15e88fa797225412429c1c50c122a',
                            type: 'xyz'
                        }
                    }
    angular.extend($scope, {
                center: {
                    lat: 39,
                    lng: -100,
                    zoom: 4
                },
                layers: {
                    baselayers:$scope.tiles 
                }
            });
    
    
    $scope.$on('$viewContentLoaded', function() {
        App.initAjax(); // initialize core components
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_maps')); // set profile link active in sidebar menu
    });
    
    $scope.changeRain =function() {
        $scope.tiles={xyz: {
                            name: 'Temperature',
                            url: 'http://{s}.maps.owm.io/current/WINDSPEED_STYLE/{z}/{x}/{y}?appid=b1b15e88fa797225412429c1c50c122a',
                            type: 'xyz'
                        }
                    }
    }
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = true;
});
