'use strict';

var app = angular.module('journeyApp', ['ui.router', 'ngMaterial', 'mwl.bluebird'])
.config(function ($urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.when('','/');

    $mdThemingProvider.theme('default')
    .primaryPalette('blue');
})
.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
    $rootScope.$on('$stateChangeSuccess', function(event){
        if (!$window.ga) return;
        $window.ga('send', 'pageview', { page: $location.path() });
    });
}]);
