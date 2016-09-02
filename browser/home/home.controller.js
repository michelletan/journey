'use strict';

// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, DatabaseFactory, FacebookFactory, $q){
	// Defaults
	$scope.defaultUserPic = '/images/user.png';
	$scope.defaultSpreadPic = '/images/landing-spread.jpg';
	$scope.defaultUserName = 'User';
	$scope.journeys = [];

	FacebookFactory.getFriends()
	.then(function(friends){
		var friendsIdArr = friends.map(function(friend){
			return friend.id;
		});
		return friendsIdArr;	
	})
	.then(function(friendsIdArr){
		return DatabaseFactory.getFeed(friendsIdArr)
	})
	.then(function(journeys){
		journeys = journeys.map(function(journey){
			journey.created = journey.created.slice(0,10);
			return journey;
		});
		console.log("Feed is: ", journeys);
		$scope.journeys = journeys;
	})

});
