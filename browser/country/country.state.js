'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('city', {
    url: '/country/:countryId',
    templateUrl: '/browser/country/country.html',
    controller: 'CountryCtrl'
  });
  
});