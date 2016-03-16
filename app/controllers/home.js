app.controller('homeController', function ($scope, $http, API_URL) {


    $http({
            method: 'POST',
            url: API_URL + "people/login",
            data: {
                'user': 'nito',
                'pass': '12345'
            }
        })
        .success(function (response) {
            $scope.user = response[0];
        }).error(function (response) {
            console.log(response);
        });
});
