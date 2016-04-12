angular.module('WeatherApp').controller('temporalGraphController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.GraficosTemporales='Graficos Temporales';
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_graficosT'));
    });
}]);
