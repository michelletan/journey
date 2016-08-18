'use strict';

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('landing', {
        url: '/',
        templateUrl: '/browser/landing/landing.html',
        controller: 'LandingCtrl'
    });

});
