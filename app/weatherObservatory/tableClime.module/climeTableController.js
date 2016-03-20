angular.module('WeatherApp').controller('climeTableController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	$scope.MyVar='Informacion De Observatorio';
    });
}]);
