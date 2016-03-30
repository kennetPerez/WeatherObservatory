angular.module('WeatherApp').controller('VariableTableController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.TablaPorVariables='Tablas Por Variables';
    });
}]);
