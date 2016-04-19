angular.module('WeatherApp').service("LoginService", function ($http, $q, API_URL) {

    this.login = function (email, pass) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'GET',
                url: API_URL + "people"
            })
            .success(function (response) {
                $http({
                        method: 'POST',
                        url: API_URL + "people/login",
                        data: {
                            'email': email,
                            'pass': pass
                        }
                    })
                    .success(function (response) {
                        defered.resolve(response[0]);
                    });

            });



        return promise;
    }
});