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
		console.log("Feed is: ", journeys);
		journeys = journeys.map(function(journey){
		  journey.posts = journey.posts.map(function(post){
		  	post.created = post.created.slice(5,10);
		    return post;
		  })
			return journey;
		})
		$scope.journeys = journeys;
	})

});
