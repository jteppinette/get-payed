(function() {
    'use strict';

    angular.module('app', [
        'ui.bootstrap',
        'ui.router',

        'LocalStorageModule',

        'templates',

        'auth',
        'dashboard'
    ]);

}());
