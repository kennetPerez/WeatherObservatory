angular.module('WeatherApp').service("UserProfileService", function ($http, $q, API_URL) {

    this.changePass = function (pass) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'POST',
                url: API_URL + "people/change_pass",
                data: pass
            })
            .success(function (response) {
                defered.resolve(response);
            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;
    }


    this.deleteAccount = function (id) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'DELETE',
                url: API_URL + "people/" + id,
            })
            .success(function (response) {
                defered.resolve(response);
            })
            .error(function (err) {
                defered.reject(err)
            });

        return promise;
    }

});
