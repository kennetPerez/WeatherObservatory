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
    var variableData;
    function setData() {
        variableData = {
            station : "",
            //weatherText: "",
            windKmH: 0,
            //windDir: "",
            temp: 0,
            humidity: 0,
            precipitation: 0,
            pressure: 0
        };
    }
    setData();
    
    
    function averagedData(data){
        data.humidity= data.humidity / cont;
        data.pressure = data.pressure / cont;
        data.temp = data.temp / cont;
        data.windKmH = data.windKmH / cont;

        return data;
    }

    
    VariableDataTableService.stations()
        .then(function (data) {
            $scope.stations = data;
            //console.log('----->',$scope.stations)
            $scope.stations.forEach(function(station){
                station.climate.forEach(function(climates){
                    variableData.station = station.station.locationName;
                    variableData.humidity += parseInt(climates.humidity);
                    variableData.precipitation += parseInt(climates.precipitation);
                    variableData.pressure += parseInt(climates.pressure);
                    variableData.temp += parseInt(climates.temp);
                    variableData.windKmH += parseInt(climates.windKmH);
                    cont++;
                })
                //insert data object in array
                $scope.generalData.push(averagedData(variableData));
                //clean data object
                setData();
                cont=0;
            })
            console.log("Arreglo nuevo",$scope.generalData);
        });



}]);
