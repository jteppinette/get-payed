(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthInterceptor', AuthInterceptor)
        .config(Config);

    function AuthInterceptor(localStorageService) {
        return {
            request: request
        };

        function request(config) {
            var token = localStorageService.get('token');
            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        }
    }

    function Config($injector, $httpProvider, localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('get-payed')
            .setStorageType('sessionStorage');

        $httpProvider.interceptors.push('AuthInterceptor');
    }

}());
