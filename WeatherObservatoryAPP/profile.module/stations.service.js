angular.module('WeatherApp').service("StationService", function ($http, $q, API_URL) {

    this.stations = function (userId, userType) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'POST',
                url: API_URL + "myStations",
                data: {
                    user: userId,
                    type: userType
                }
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }
    
    this.createStation = function (userId, idService , lat, lon, locationName) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http({
                method: 'POST',
                url: API_URL + "store",
                data: {
                    idPersona: userId,
                    idService: idService,
                    lat : lat,
                    lon : lon,
                    locationName : locationName
                }
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }
    

    this.delete = function (id){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'DELETE',
                url: API_URL + "stations/" + id,
            })
            .success(function (response) {
                defered.resolve(response);
            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;
    }

    this.update = function (station){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'POST',
                url: API_URL + "stations/update",
                data: station
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }


});
