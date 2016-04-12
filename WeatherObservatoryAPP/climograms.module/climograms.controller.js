angular.module('WeatherApp').controller('climogramsController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.climoDiagramas='Climodiagramas';
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_informes'));
    });
}]);
