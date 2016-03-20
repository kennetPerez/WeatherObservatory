angular.module('WeatherApp').controller('graphicsVController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	$scope.GraficosPorVariables='Graficos Por Variable';
    });
}]);
