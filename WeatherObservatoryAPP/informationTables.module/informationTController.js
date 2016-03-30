angular.module('WeatherApp').controller('informationTController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	$scope.tablasInformativas='Tablas Informativas';
    });
}]);