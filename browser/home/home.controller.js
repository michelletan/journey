'use strict';

// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, DatabaseFactory, FacebookFactory, $q){
  // Redirect users if they haven't logged in
  FB.getLoginStatus(function(response) {
      FacebookFactory.statusChangeCallback(response)
      .then(function(userObj){
              if(!userObj.id) return;
          $scope.userName = userObj.name;
          $scope.userSource = userObj.source;
          $scope.userId = userObj.id;
      })
  });

	// Defaults
	$scope.defaultUserPic = '/images/user.png';
	$scope.defaultSpreadPic = '/images/landing-spread.jpg';
	$scope.defaultUserName = 'User';

	FacebookFactory.getFriends()
	.then(function(friends){
		var friendsIdArr = friends.map(function(friend){
			return friend.id;
		});
		console.log("Friends Ids Array is: ", friendsIdArr);
		return friendsIdArr;	
	})
	.then(function(friendsIdArr){
		return DatabaseFactory.getFeed(friendsIdArr)
		.then(function(journeys){
			console.log("DBgetFeed journeys is: ", journeys);
			return journeys;
		})
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
