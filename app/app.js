(function() {
    'use strict';

    angular
        .module('app', ['ui.bootstrap', 'ui.router', 'templates'])
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
                    templateUrl: "auth/login/login.html"
                }) ;
    }


}());
