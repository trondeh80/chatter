(function () {
    'use strict';
    angular.module('chatter').controller('Root', Root) ;

    /* Base root controller for all pages */
    function Root($rootScope, UserService, $state){
        var vm = this  ;

        activate();

        function activate(){
            UserService.isAuthenticated().then(function (r) {
                if (r.data.isAuthenticated === true) {
                    $rootScope.isAuthenticated = true;
                    $rootScope.userId = r.data.userId;
                } else {
                    $state.go('login');
                }
            });
        }
        
    }

})();
