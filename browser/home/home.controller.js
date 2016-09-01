'use strict';

// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, DatabaseFactory, FacebookFactory, $q){
	// Defaults
	$scope.defaultUserPic = '/images/user.png';
	$scope.defaultSpreadPic = '/images/landing-spread.jpg';
	$scope.defaultUserName = 'User';

	DatabaseFactory.getFeed()
	.then(function(journeys){
		console.log("Feed is: ", journeys);
		journeys.created = journeys.created.slice(0,10);
		$scope.journeys = journeys;
	})

});
