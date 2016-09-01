'use strict';

var app = angular.module('journeyApp', ['ui.router', 'ngMaterial', 'mwl.bluebird'])
.config(function ($urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.when('','/');

    $mdThemingProvider.theme('default')
    .primaryPalette('blue');
})
.run(['$rootScope', '$location', '$window', function($rootScope, $location){
    $rootScope.$on('$stateChangeSuccess', function(){
      ga('send', 'pageview', { page: $location.path() });
    });
}]);
