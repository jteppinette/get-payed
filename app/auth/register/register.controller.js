(function() {
    'use strict';

    angular
        .module('auth.register')
        .controller('RegisterController', RegisterController);

    function RegisterController(AuthService) {
        var vm = this;

        vm.submit = submit;

        vm.credentials = {
            email: undefined,
            password: undefined
        };
        vm.error = undefined;

        function submit(credentials) {
            return AuthService.register(credentials.email, credentials.password)
                .catch(function(err) {
                    vm.error = err.data;
                });
        }
    }

}());
