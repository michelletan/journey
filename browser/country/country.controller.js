'use strict';

app.controller('CountryCtrl', function($scope, $stateParams, CountryFactory){
	CountryFactory.getOneCity($stateParams.id)
	.then(function(country){
		$scope.country = country;
	})

});
