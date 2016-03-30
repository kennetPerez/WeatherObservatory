angular.module('WeatherApp').controller('VariableGraphController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.GraficosPorVariables='Graficos Por Variable';
    });
}]);
