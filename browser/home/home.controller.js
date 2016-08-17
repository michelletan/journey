'use strict';

// Both Home Controller and City Controller use the City Factory
app.controller('HomeCtrl', function($scope, $state, $stateParams, CountryFactory){
	CountryFactory.getAllCities()
	.then(function(cities){
		$scope.cities = cities;
	});

	$scope.goToCountry = function(countryId){
		$state.go('country', {id: countryId})
	}

});
