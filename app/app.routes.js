(function() {
    'use strict';

    angular
        .module('app')
        .config(Routes);

    function Routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        $stateProvider
            .state('auth', {
                templateUrl: "auth/auth.html",
                abstract: true
            })
                .state('auth.login', {
                    url: "/login",
                    controller: 'LoginController',
                    controllerAs: 'login',
                    templateUrl: "auth/login/login.html"
                }) 
                .state('auth.register', {
                    url: "/register",
                    controller: 'RegisterController',
                    controllerAs: 'register',
                    templateUrl: "auth/register/register.html"
                })

            .state('dashboard', {
                templateUrl: "dashboard/dashboard.html",
                controller: 'DashboardController',
                controllerAs: 'dashboard',
                resolve: {
                    auth: function($state, $q, $timeout, localStorageService) {
                        var token = localStorageService.get('token');
                        if (token) {
                            return token;
                        } else {
                            $timeout(function() {
                                $state.go('auth.login');
                            });
                            return $q.reject();
                        }
                    }
                },
                abstract: true
            })
                .state('dashboard.overview', {
                    url: "/overview",
                    controller: 'OverviewController',
                    controllerAs: 'overview',
                    templateUrl: "dashboard/overview/overview.html"
                })
                .state('dashboard.payments', {
                    url: "/payments",
                    controller: 'PaymentsController',
                    controllerAs: 'payments',
                    templateUrl: "dashboard/payments/payments.html"
                });
    }

}());
