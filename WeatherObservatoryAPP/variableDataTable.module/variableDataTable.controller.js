angular.module('WeatherApp').controller('VariableDataTableController', ['$rootScope', '$scope', 'settings', 'VariableDataTableService', function($rootScope, $scope, settings, VariableDataTableService) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.GraficosGenerales='Graficos Generales';
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_graficosG'));
    });

    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = false;

    

    $scope.generalData = [];

    var cont = 0;
    //clean data object
    var data;
    function setData() {
        data = {
            station : "",
            weatherText: "",
            windKmH: 0,
            windDir: "",
            temp: 0,
            humidity: 0,
            precipitation: 0,
            pressure: 0
        };
    }
    setData();
    
    
    function averagedData(data){
        data.humidity= data.humidity / cont;
        data.precipitation = data.precipitation / cont;
        data.pressure = data.pressure / cont;
        data.temp = data.temp / cont;
        data.windKmH = data.windKmH / cont;

        return data;
    }

    VariableDataTableService.stations()
        .then(function (data) {
            $scope.stations = data;
            console.log('fgjhgjh',$scope.stations)
            $scope.stations.forEach(function(station){
                station.climate.forEach(function(climates){
                    data.station = station.station.locationName;
                    data.weatherText = climates.weatherText;
                    data.humidity += climates.humidity;
                    data.precipitation += climates.precipitation;
                    data.pressure += climates.pressure;
                    data.temp += climates.temp;
                    data.windKmH += climates.windKmH;
                    cont++;
                })
                //dividir
                //insert data object in array
                $scope.generalData.push(averagedData(data));
                //clean data object
                setData();
                cont=0;
            })
        });
}]);
