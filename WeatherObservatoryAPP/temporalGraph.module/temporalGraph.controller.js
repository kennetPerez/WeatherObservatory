angular.module('WeatherApp').controller('temporalGraphController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.GraficosTemporales='Graficos Temporales';
    });
}]);
