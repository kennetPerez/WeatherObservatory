angular.module('WeatherApp').controller('temporalGController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	$scope.GraficosTemporales='Graficos Temporales';
    });
}]);
