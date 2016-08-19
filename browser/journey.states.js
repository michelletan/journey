'use strict';

app.config(function($stateProvider){
  $stateProvider.state('landing', {
      url: '/',
      templateUrl: '/browser/landing/landing.html',
      controller: 'LandingCtrl'
  });

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/browser/home/home.html',
    controller: 'HomeCtrl'
  });

  $stateProvider.state('country', {
    url: '/countries/:id',
    templateUrl: '/browser/country/country.html',
    controller: 'CountryCtrl'
  });

  $stateProvider.state('place', {
    url: '/countries/:countryId/places/:placeId',
    templateUrl: '/browser/place/place.html',
    controller: 'PlaceCtrl'
  });

  $stateProvider.state('policy', {
    url: '/policy',
    templateUrl: '/browser/policy/policy.html'
  });

  $stateProvider.state('terms', {
    url: '/terms',
    templateUrl: '/browser/terms/terms.html'
  });


});
