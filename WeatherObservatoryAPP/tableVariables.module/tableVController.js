angular.module('WeatherApp').controller('tableVController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	$scope.TablaPorVariables='Tablas Por Variables';
    });
}]);
