'use strict';

/* global countries */
// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, CountryFactory, facebookFactory, pixabayFactory, $q){

	var fake = [{
		source: 'https://dl.dropboxusercontent.com/s/7oj274ereyxpkxd/landing-feature1.jpg?dl=0',
		name: 'America'
	},
	{
		source: 'https://dl.dropboxusercontent.com/s/mnecwpd5a1qctmt/landing-feature2.jpg?dl=0',
		name: 'China'
	},
	{
		source: 'https://dl.dropboxusercontent.com/s/rngr2ta7lx1labe/landing-feature3.jpg?dl=0',
		name: 'France'
	},
	{
		source: 'https://dl.dropboxusercontent.com/s/70lkgfzcrb0hagu/munich-1220908.jpg?dl=0',
		name: 'Belgium'
	}];

	$scope.fakeCountries = fake;
	$scope.goToCountry = goToCountry;

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

	// Public functions
	function goToCountry(id) {
		$state.go('country', {id: id});
	}

});
