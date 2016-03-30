angular.module('WeatherApp').controller('generalController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	$scope.GraficosGenerales='Graficos Generales';
    });
}]);