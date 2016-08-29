'use strict';

app.controller('JourneysCtrl', function($scope, $state, $stateParams, DatabaseFactory){
	$scope.userId = 123; // Placeholder, we need the actual user's facebook ID to get journeys
	DatabaseFactory.getAllJourneys($scope.userId)
	.then(function(journeys){
		$scope.journeys = journeys;
	});

	$scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';
    $scope.defaultCoverUrl = '/images/landing-feature2.jpg';

    $scope.defaultJourneyTitle = 'Amazing Trip';

    $scope.journeys = [
        {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}
    ];

    $scope.goToJourney = goToJourney;

    // Public functions
    function goToJourney(id) {
        $state.go('journey', {id: id});
    }

});
