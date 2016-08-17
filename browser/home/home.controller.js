'use strict';

/* global countries */
// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, CountryFactory){
	$scope.countries = countries; 

});
