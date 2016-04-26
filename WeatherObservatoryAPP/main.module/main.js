var WeatherApp = angular.module("WeatherApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngMap",
    "ngCookies"
])

.constant('API_URL', 'http://localhost:8000/WeatherObservatory/WeatherObservatoryAPI/public/index.php/api/v1/');


WeatherApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({});
}]);

WeatherApp.config(['$controllerProvider', function ($controllerProvider) {
    $controllerProvider.allowGlobals();
}]);

WeatherApp.factory('settings', ['$rootScope', function ($rootScope) {
    var settings = {
        layout: {
            pageSidebarClosed: false,
            pageContentWhite: true,
            pageBodySolid: false,
            pageAutoScrollOnLoad: 1000
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout4',
    };

    $rootScope.settings = settings;

    return settings;
}]);


WeatherApp.factory('Auth', ['$cookies', '$location', function ($cookies, $location) {
    return {
        login: login,

        logout: logout,

        checkStatus: check
    }

    function login(data) {
        $cookies.putObject('userData', data);
        $location.path("/profile/account");
    }

    function logout() {
        $cookies.remove('userData');
        $location.path("/login");
    }

    function in_array(needle, haystack) {
        var key = '';
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
        return false;
    }

    function check() {
        var privateRoutes = ["/profile/account", "/profile/myObservatory", "/profile"];
        var userData = $cookies.getObject('userData');

        if (in_array($location.path(), privateRoutes) && typeof (userData) == "undefined") {
            $location.path("/login");
        } else if (in_array($location.path(), privateRoutes) && typeof (userData) != "undefined") {
            $location.path("/profile/account");
        }
    }
}]);



/* Setup App Main Controller */
WeatherApp.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {
        App.initComponents(); // init core components
    });
}]);

/* Setup Layout Part - Header */
WeatherApp.controller('HeaderController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader();
    });
}]);

/* Setup Layout Part - Sidebar */
WeatherApp.controller('SidebarController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        $scope.Observatorio = 'My Observatorio';
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Sidebar */
WeatherApp.controller('PageHeadController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Quick Sidebar */
WeatherApp.controller('QuickSidebarController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        setTimeout(function () {
            QuickSidebar.init(); // init quick sidebar
        }, 2000)
    });
}]);

/* Setup Layout Part - Footer */
WeatherApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
WeatherApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider

    // Dashboard
        .state('dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard.module/dashboard.view.html",
        data: {
            pageTitle: 'Weather Observatory'
        },
        controller: "DashboardController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before',
                    files: [
                        'assets/pages/scripts/dashboard.min.js',
                        'dashboard.module/dashboard.service.js',
                        'dashboard.module/dashboard.controller.js',
                    ]
                });
            }]
        }
    })

    // User Profile
    .state("profile", {
        url: "/profile",
        templateUrl: "profile.module/profile.view.html",
        data: {
            pageTitle: 'User Profile'
        },
        controller: "UserProfileController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before',
                    files: [
                        'assets/pages/css/profile.css',
                        'assets/global/css/sweetalert.css',



                        'assets/global/plugins/datatables/datatables.min.css',
                        'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                        'assets/global/plugins/datatables/datatables.all.min.js',
                        'assets/pages/scripts/table-datatables-managed.min.js',
                        'assets/global/plugins/clockface/css/clockface.css',
                        'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                        'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                        'assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                        'assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                        'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

                        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                        'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                        'assets/global/plugins/clockface/js/clockface.js',
                        'assets/global/plugins/moment.min.js',
                        'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js',
                        'assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                        'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

                        'assets/pages/scripts/components-date-time-pickers.min.js',



                        'assets/pages/scripts/profile.min.js',
                        'assets/global/plugins/sweetalert.min.js',
                        'profile.module/UserProfile.service.js',
                        'profile.module/location.service.js',
                        'profile.module/stations.service.js',
                        'profile.module/UserProfile.controller.js'
                    ]
                });
            }]
        }
    })

    .state("profile.account", {
        url: "/account",
        templateUrl: "profile.module/account.view.html",
        data: {
            pageTitle: 'User Profile'
        }
    })

    // User Profile Account
    .state("profile.observatory", {
        url: "/myObservatory",
        templateUrl: "profile.module/observatory.view.html",
        data: {
            pageTitle: 'User Account'
        }
    })

    // User Login
    .state("login", {
        url: "/login",
        templateUrl: "login.module/login.html",
        data: {
            pageTitle: 'Login'
        },
        controller: "LoginController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                    files: [
                        'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                        'assets/pages/css/profile.css',

                        'assets/global/plugins/jquery.sparkline.min.js',
                        'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                        'assets/pages/scripts/profile.min.js',

                        'login.module/login.service.js',
                        'login.module/login.controller.js'
                    ]
                });
            }]
        }
    })

    // User Register
    .state("register", {
        url: "/register",
        templateUrl: "register.module/register.html",
        data: {
            pageTitle: 'Register'
        },
        controller: "RegisterController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                    files: [
                        'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                        'assets/pages/css/profile.css',

                        'assets/global/plugins/jquery.sparkline.min.js',
                        'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                        'assets/pages/scripts/profile.min.js',

                        'register.module/register.service.js',
                        'register.module/register.controller.js'
                    ]
                });
            }]
        }
    })

    //tablas informativas
    .state('informationTables', {
        url: "/informationTables",
        templateUrl: "informationTables.module/informationTables.view.html",
        data: {
            pageTitle: 'Tablas Informativas'
        },
        controller: "InformationTablesController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before',
                    files: [
                        'informationTables.module/informationTables.controller.js'
                    ]
                }]);
            }]
        }
    })

    //climodiagramas
    .state('climograms', {
        url: "/climograms",
        templateUrl: "climograms.module/climograms.view.html",
        data: {
            pageTitle: 'Climo Diagramas'
        },
        controller: "climogramsController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before',
                    files: [
                        'climograms.module/climograms.controller.js'
                    ]
                }]);
            }]
        }
    })

    //graficos Generales
    .state('generalGraph', {
        url: "/generalGraph",
        templateUrl: "generalGraph.module/generalGraph.view.html",
        data: {
            pageTitle: 'Graficos Generales'
        },
        controller: "GeneralGraphController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before',
                    files: [
                        'generalGraph.module/generalGraph.controller.js'
                    ]
                }]);
            }]
        }
    })

    //graficos Temporales
    .state('temporalGraph', {
        url: "/temporalGraph",
        templateUrl: "temporalGraph.module/temporalGraph.view.html",
        data: {
            pageTitle: 'Graficos Temporales'
        },
        controller: "temporalGraphController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                    files: [
                        'temporalGraph.module/temporalGraph.controller.js'
                    ]
                }]);
            }]
        }
    })

    //graficos por variable
    .state('variableGraph', {
        url: "/variableGraph",
        templateUrl: "variableGraph.module/variableGraph.view.html",
        data: {
            pageTitle: 'Grafico por variables'
        },
        controller: "VariableGraphController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before',
                    files: [
                        'variableGraph.module/variableGraph.controller.js'
                    ]
                });
            }]
        }
    })

    //Tablas por variables
    .state('variableTable', {
        url: "/variableTable",
        templateUrl: "variableTable.module/variableTable.view.html",
        data: {
            pageTitle: 'Tablas Por Variables'
        },
        controller: "VariableTableController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before',
                    files: [
                        'variableTable.module/variableTable.controller.js'
                    ]
                });
            }]
        }
    })

    // mapas
    .state('maps', {
        url: "/maps",
        templateUrl: "maps.module/maps.view.html",
        data: {
            pageTitle: 'Mapas'
        },
        controller: "MapsController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'WeatherApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                    files: [
                        'assets/apps/css/todo-2.css',
                        'assets/apps/scripts/todo-2.min.js',
                        'maps.module/maps.controller.js'
                    ]
                });
            }]
        }
    })

}]);

/* Init global settings and run the app */
WeatherApp.run(["$rootScope", "settings", "$state", "Auth", function ($rootScope, settings, $state, Auth) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view

    $rootScope.$on('$stateChangeStart', function () {
        Auth.checkStatus();
    })

}]);
