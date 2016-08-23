'use strict';

// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, CountryFactory, FacebookFactory, PixabayFactory, $q){

/*	var fake = [{
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

	$scope.fakeCountries = fake;*/

	FacebookFactory.getCountries()
	.then(function(countriesObj){
		var countries = countriesObj.countries;
		console.log("before finding images, countries is: ", countries);
		return $q.map(countries, function(country){
			return PixabayFactory.getCountryImgUrl(country.name)
			.then(function(imageUrl){
				console.log("an imageUrl was found: ", imageUrl);
				country.source = imageUrl;
				console.log("country with imageUrl is now: ", country);
				return country;
			})
		})
		.then(function(updatedCountries){
			console.log("updatedCountries is now: ", updatedCountries);
			$scope.countries = updatedCountries;
		})
	});

	// Public functions
	$scope.goToCountry = function(id) {
		$state.go('country', {id: id});
	}

});
