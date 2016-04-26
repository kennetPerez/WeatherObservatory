angular.module('WeatherApp').controller('UserProfileController', function ($rootScope, $scope, $cookies, $location, $timeout, Auth, UserProfileService, locationServive,StationService) {
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

        swal({
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
             function (isConfirm) {
            if (isConfirm) {
                Auth.logout();
                UserProfileService.deleteAccount($scope.user.id)
                    .then(function (data) {
                    swal("Eliminada", "Su cuenta fue eliminada correctamente.", "success");
                    $location.path("/login");
                })
                    .catch(function (err) {
                    console.log(err);
                });
            } else {
                swal("Cancelado", "Su cuenta no fue eliminada.", "error");
            }
        });
    }

    $scope.station = {
        locationName: "",
        latitud: "",
        longitud: "",
        idService: "1",
        idUser: $scope.user.id
    };

    $scope.stationEdit = function (station) {
        station.idService = station.idService.toString();
        $scope.station = station;
        console.log($scope.station)
    }

    $scope.stationAdd = function () {
        $scope.station = {
            locationName: "",
            latitud: "",
            longitud: "",
            idService: "1",
            idUser: $scope.user.id
        };
    }

    $scope.deleteStation = function () {

        swal({
            title: "¿Estas seguro?",
            text: "Si eliminas esta estación, todos sus registros seran eliminados!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "No, cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
             function (isConfirm) {
            if (isConfirm) {
                StationService.delete($scope.station.id)
                    .then(function (data) {
                    swal("Eliminada", "Su cuenta fue eliminada correctamente.", "success");
                    getStation();
                })
                    .catch(function (err) {
                    console.log(err);
                });

            } else {
                swal("Cancelado", "La estación no fue eliminada.", "error");
            }
        });
    }

    $scope.editStation = function () {
        StationService.update($scope.station)
            .then(function (data) {
            swal("Completado!", "La estacion fue modificada!", "success")
            getStation();
        })
            .catch(function (err) {
            console.log(err);
        });
    }


    $scope.getLocation = function () {
        locationServive.getLocation()
            .then(function (data) {
            $scope.getloc = true;
            $scope.station.latitud = data.lat;
            $scope.station.longitud = data.lon;
        })
    }

    function getStation(){
        StationService.stations($scope.user.id, $scope.user.type)
            .then(function (data) {
            $scope.myStations = data;

            $scope.registerNumber = 0;

            $scope.myStations.forEach(function(station){
                $scope.registerNumber += (station.climate.length + station.astro.length)
            });


        });}
    getStation();

    $scope.createStation = function () {
        StationService.createStation($scope.station.idUser, $scope.station.idService ,$scope.station.latitud, $scope.station.longitud,  $scope.station.locationName).then(function (data) {
            console.log('--------------');
            console.log(data);
            $scope.myStations.push(data);
        });
    } 

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = true;

});
