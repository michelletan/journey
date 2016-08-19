'use strict';
/* global countries */
app.controller('PlaceCtrl', function($scope, $stateParams){
	// View settings

	console.log($stateParams);

	countries.forEach(function(country){
		if(country.id == $stateParams.countryId){
			$scope.country = country;
			console.log("Country is", $scope.country);
		}
	})

});
