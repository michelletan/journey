'use strict';
/* global countries */
app.controller('CountryCtrl', function($scope, $state, $stateParams, CountryFactory){
	// View settings
	$scope.defaultPlacesShown = 3;
	$scope.maxPlacesShown = 3;

	$scope.goToPlace = goToPlace;

	countries.forEach(function(country){
		if(country.id == $stateParams.id){
			$scope.country = country;
			console.log("Country is", $scope.country);
		}
	})

	// Public functions
	function goToPlace(id) {
		$state.go('place', {countryId: $stateParams.id, placeId: id});
	}

});
