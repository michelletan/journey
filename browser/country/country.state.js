'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('country', {
    url: '/countries/:id',
    templateUrl: '/browser/country/country.html',
    controller: 'CountryCtrl'
  });
  
});