angular.module('WeatherApp').controller('AstronomicTableController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	$scope.MyName='Informacion Astronomica';
    });
}]);