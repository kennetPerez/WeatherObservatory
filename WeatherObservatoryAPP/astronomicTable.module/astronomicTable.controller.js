angular.module('WeatherApp').controller('AstronomicTableController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {
    	$scope.MyName='Informacion Astronomica';
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_observatorio')); // set profile link active in sidebar menu
    });
}]);
