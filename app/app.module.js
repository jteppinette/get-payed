(function() {
    'use strict';

    angular.module('app', [
        'ui.bootstrap',
        'ui.router',

        'toastr',

        'LocalStorageModule',

        'templates',

        'auth',
        'dashboard'
    ]);

}());
