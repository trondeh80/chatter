(function () {
  'use strict';
  angular.module('chatter').controller('LoginController', LoginController);

  function LoginController($http, WEBAPI, $location, UserService) {
    var vm = this;
    vm.login = login;
    vm.failedLogin = false;

    function login() {
      $http.get(WEBAPI + '?mod=Authentication&action=login&user=' + vm.user + '&password=' + vm.pw).then(function (response) {
        if (response.data.login) {
          UserService.setAuthentication(response.data.user, response.data.sessionId) ;
          $location.url('/'); // route to start.
          vm.failedLogin = false;
        } else {
          vm.failedLogin = true;
        }
      });
    }

  }
})();
