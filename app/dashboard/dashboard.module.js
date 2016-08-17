(function() {
    'use strict';

    angular.module('dashboard', [
        'dashboard.overview',
        'dashboard.payments',
        'dashboard.account',

        'dashboard.common.address'
    ]);

}());
