angular.module('WeatherApp').controller('InformationTablesController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.tablasInformativas='Tablas Informativas';
        
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_ITables'));
        
    });
}]);
