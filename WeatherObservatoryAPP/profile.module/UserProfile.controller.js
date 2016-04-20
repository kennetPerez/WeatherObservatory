angular.module('WeatherApp').controller('UserProfileController', function ($rootScope, $scope, $cookies, $location, $timeout, Auth, UserProfileService, locationServive) {
    $scope.$on('$viewContentLoaded', function () {
        App.initAjax(); // initialize core components
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_profile')); // set profile link active in sidebar menu
    });

    $scope.user = $cookies.getObject('userData');

    $scope.logout = function () {
        Auth.logout();
    }

    $scope.pass = {
        new: "",
        current: "",
        confirm: "",
        id: $scope.user.id
    }

    $scope.correctChange = false;
    $scope.incorrectConfirm = false;
    $scope.incorrectPass = false;
    $scope.correctChange = false;

    $scope.changePass = function (form) {
        if ($scope.pass.new != $scope.pass.confirm) {
            $scope.incorrectConfirm = true;
            $timeout(function () {
                $scope.incorrectConfirm = false;
            }, 3000);
        } else {
            UserProfileService.changePass($scope.pass)
                .then(function (data) {
                if (data == '0') {
                    $scope.correctChange = true;
                    $timeout(function () {
                        $scope.correctChange = false;
                    }, 3000);

                    $scope.pass = {
                        new: "",
                        current: "",
                        confirm: "",
                        id: $scope.user.id
                    }

                    form.$setUntouched();


                } else if (data == '1') {
                    $scope.incorrectPass = true;
                    $timeout(function () {
                        $scope.incorrectPass = false;
                    }, 3000);
                }
            })
                .catch(function (err) {
                console.log(err);
            });
        }
    }

    $scope.deleteAccount = function () {

        swal(
            {
                title: "¿Estas seguro?",
                text: "Si eliminas tu cuenta, todos tus datos seran eliminados!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm)
            {
                if (isConfirm)
                {
                    Auth.logout();
                    UserProfileService.deleteAccount($scope.user.id)
                        .then(function (data) {
                        swal("Eliminada", "Su cuenta fue eliminada correctamente.", "success");
                        $location.path("/login");
                    })
                        .catch(function (err) {
                        console.log(err);
                    });
                }
                else
                {
                    swal("Cancelado", "Su cuenta no fue eliminada.", "error");
                }
            });
    }



    $scope.station = {locationName: "", latitud: "", longitud: "", idService: "", idUser: $scope.user.id};

    $scope.getLocation = function() {
        locationServive.getLocation()
            .then(function (data){
            $scope.getloc = true;
            $scope.station.latitud = data.lat;
            $scope.station.longitud = data.lon;
        })
    }






    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = true;
});
