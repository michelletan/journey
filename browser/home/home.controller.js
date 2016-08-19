'use strict';

/* global countries */
// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, CountryFactory, facebookFactory, pixabayFactory, $q){
	facebookFactory.getCountries()
	.then(function(countriesObj){
		var countries = countriesObj.countries;
		return $q.map(countries, function(country){
			return pixabayFactory.getCountryImgUrl(country.name)
			.then(function(imageUrl){
				country.source = imageUrl;
				return country;
			})
		})
		.then(function(updatedCountries){
			$scope.countries = updatedCountries;
		})
	});
	
});
