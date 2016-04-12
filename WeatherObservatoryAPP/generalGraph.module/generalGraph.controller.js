angular.module('WeatherApp').controller('GeneralGraphController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.GraficosGenerales='Graficos Generales';
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_graficosG'));
    });
}]);
