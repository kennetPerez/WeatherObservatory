app.service("RegisterService", function ($http, $q, API_URL) {

    this.register = function (user) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'POST',
                url: API_URL + "people/register",
                data: user
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
