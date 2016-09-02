'use strict';

// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, DatabaseFactory, FacebookFactory, $q){
	// Defaults
	$scope.defaultUserPic = '/images/user.png';
	$scope.defaultSpreadPic = '/images/landing-spread.jpg';
	$scope.defaultUserName = 'User';

	// $scope.journeys = [{user: 'User', name: 'Amazing Trip', posts: [{}, {}, {}]}, {user: 'User', name: 'Amazing Trip', posts: [{}, {}, {}]},{user: 'User', name: 'Amazing Trip', posts: [{}, {}, {}]}];

	DatabaseFactory.getFeed()
	.then(function(journeys){
		journeys = journeys.map(function(journey){
			journey.created = journey.created.slice(0,10);
			return journey;
		});
		console.log("Feed is: ", journeys);
		$scope.journeys = journeys;
	})

});
