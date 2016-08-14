(function() {
    'use strict';

    angular
        .module('app')
        .config(Config);

    function Config($stateProvider, $urlRouterProvider) {
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
                }) ;
    }

}());
