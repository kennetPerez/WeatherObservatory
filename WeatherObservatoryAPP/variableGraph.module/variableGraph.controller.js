angular.module('WeatherApp').controller('VariableGraphController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.GraficosPorVariables='Graficos Por Variable';
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_GraficosV'));
    });
}]);
