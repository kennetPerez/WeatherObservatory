angular.module('WeatherApp').service("DashboardService", function ($http, $q, API_URL) {

    this.stations = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'GET',
                url: API_URL + "stations"
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }
});