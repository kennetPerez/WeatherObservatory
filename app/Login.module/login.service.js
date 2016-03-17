app.service("LoginService", function ($http, $q, API_URL) {

    this.login = function (user, pass) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'POST',
                url: API_URL + "people/login",
                data: {
                    'user': user,
                    'pass': pass
                }
            })
            .success(function (response) {
                defered.resolve(response[0]);
            });

        return promise;
    }
});
