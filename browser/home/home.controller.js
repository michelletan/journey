'use strict';

/* global countries */
// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, CountryFactory, PixabayFactory, facebookFactory){
	facebookFactory.getCountries()
	.then(function(countries){
		$scope.countries = countries;
	});

	/*
	PixabayFactory.getCountry('italy').then(function(data){
		console.log(data);
	});*/

});
