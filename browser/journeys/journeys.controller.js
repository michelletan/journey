'use strict';

app.controller('JourneysCtrl', function($scope, $state, $stateParams, DatabaseFactory, $rootScope){
	$scope.userId = $rootScope.userId;
    $scope.userName = $rootScope.userName;
    $scope.userSource = $rootScope.userSource;
	DatabaseFactory.getAllJourneys($rootScope.userId)
	.then(function(allUserData){
        console.log("Journey to be displayed are:", allUserData.journeys);
        var journeys = allUserData.journeys;
        journeys.map(function(journey){
            journey.created = journey.created.slice(6,11);
            return journey; 
        }) 
        $scope.journeys = journeys;
	});
    
	$scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';
    $scope.defaultCoverUrl = '/images/landing-feature2.jpg';
    $scope.defaultJourneyTitle = 'Amazing Trip';

    $scope.goToJourney = function(journeyId){
        $state.go('journey', {journeyId: journeyId});
    }

});

