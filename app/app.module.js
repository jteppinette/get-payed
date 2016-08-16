(function() {
    'use strict';

    angular.module('app', [
        'ui.bootstrap',
        'ui.router',

        'monospaced.qrcode',

        'toastr',

        'LocalStorageModule',

        'templates',

        'auth',
        'dashboard'
    ]);

}());
