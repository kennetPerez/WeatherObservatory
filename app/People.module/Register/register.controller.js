app.controller('RegisterController', function ($scope, RegisterService, Auth) {

    $scope.user = {
        'email': "a@a",
        name: "a",
        lastName: "s",
        type: 0,
        pass: "12345"
    };

    $scope.register = function () {
        RegisterService.register($scope.user)
            .then(function (data) {
                if (data !== undefined) {
                    Auth.login(data);
                } else {
                    alert("Invalid.")
                }
            })
            .catch(function (err) {
                alert("Email exist.")
            });
    }
});
