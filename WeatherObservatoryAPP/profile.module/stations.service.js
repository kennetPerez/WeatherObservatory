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
                url: API_URL + "stations",
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
    
    this.addAstroInfo = function (astro){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'POST',
                url: API_URL + "astronomic",
                data: astro
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }
    
    this.addClimeInfo = function (clime){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'POST',
                url: API_URL + "climate",
                data: clime
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }
    
    this.editAstronomicInfo = function (astro){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'POST',
                url: API_URL + "astronomic/update",
                data: astro
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }


    this.deleteAstronomicInfo = function (id){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'DELETE',
                url: API_URL + "astronomic/" + id,
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }


    this.editClimateInfo = function (clime){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'POST',
                url: API_URL + "climate/update",
                data: clime
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }


    this.deleteClimateInfo = function (id){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'DELETE',
                url: API_URL + "climate/" + id,
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }

    this.deleteAstronomicInfo = function (id){
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'DELETE',
                url: API_URL + "astronomic/" + id,
            })
            .success(function (response) {
                defered.resolve(response);
            });

        return promise;
    }
    
    

});
