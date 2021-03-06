(function() {
    'use strict';

    angular
        .module('auth.login')
        .controller('LoginController', LoginController);

    function LoginController(AuthService) {
        var vm = this;

        vm.submit = submit;

        vm.credentials = {
            email: undefined,
            password: undefined
        };

        function submit(credentials) {
            return AuthService.login(credentials.email, credentials.password);
        }
    }

}());
