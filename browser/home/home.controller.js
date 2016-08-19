'use strict';

/* global countries */
// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, CountryFactory, facebookFactory, pixabayFactory, $q){

	var fake = [{
		source: 'http://www.gluckman.com/UB-1658.jpg',
		name: 'Mongolia'
	},
	{
		source: 'http://goldenvipworld.com/images/prodotti/russia/16.jpg',
		name: 'Russia'
	},
	{
		source: 'http://cdn.lolwot.com/wp-content/uploads/2015/02/18-must-see-places-in-the-world-1.jpg',
		name: 'United States'
	},
	{
		source: 'https://www.singaporeair.com/saar5/images/navigation/plan-travel/packages/singapore-stopover-holiday.jpg',
		name: 'Singapore'
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
		$state.go('country', {id: id+1});
	}

});
