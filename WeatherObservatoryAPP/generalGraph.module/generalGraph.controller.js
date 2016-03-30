angular.module('WeatherApp').controller('GeneralGraphController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.GraficosGenerales='Graficos Generales';
    });
}]);
