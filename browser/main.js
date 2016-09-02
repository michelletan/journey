'use strict';

var app = angular.module('journeyApp', ['ui.router', 'ngMaterial', 'mwl.bluebird'])
.config(function ($urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.when('','/');
    
    // Returns to landing page if user types an undefined url
		$urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('default')
    .primaryPalette('blue');
})
// For Google Analytics, update tracker when state changes occur
.run(['$rootScope', '$location', '$window', function($rootScope, $location){
    $rootScope.$on('$stateChangeSuccess', function(){
      ga('send', 'pageview', { page: $location.path() });
    });
}]);
