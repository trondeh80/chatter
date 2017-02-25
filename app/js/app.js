(function () {
    'use strict';
    var app = angular.module('chatter', [
        'ngSanitize',
        'ngAria',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ui.bootstrap'
    ]);
    app.config(function ($stateProvider, $urlRouterProvider) {

        // our routing setup:
        $stateProvider

            // Login controller
            .state('login', {
                url: '/login',
                template: require ('./components/user/login.html'),
                controller: 'LoginController',
                controllerAs: 'login'
            })

            // Initial abstract route that runs the root controller
            .state('app', {
                abstract: true,
                controller: 'Root',
                template: '<ui-view class="main"/>'
            })

            // Start Page state...
            .state('app.start', {
                url: '/',
                template: '<chat-page class="main-inner"/>'
            });

        $urlRouterProvider
            .otherwise('/');

    });
})();
