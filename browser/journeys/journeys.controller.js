'use strict';

app.controller('JourneysCtrl', function($scope, $state, $stateParams, DatabaseFactory){
	$scope.userId = 123; // Placeholder, we need the actual user's facebook ID to get journeys
	DatabaseFactory.getAllJourneys($scope.userId)
	.then(function(journeys){
		$scope.journeys = journeys;
	});

});
