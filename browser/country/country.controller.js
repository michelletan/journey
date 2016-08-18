'use strict';
/* global countries */
app.controller('CountryCtrl', function($scope, $stateParams, CountryFactory){
	countries.forEach(function(country){
		if(country.id == $stateParams.id){
			$scope.country = country;
			console.log("Country is", $scope.country);
		}
	})

});
