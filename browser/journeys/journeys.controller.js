'use strict';

app.controller('JourneysCtrl', function($scope, $state, $stateParams, DatabaseFactory, $rootScope){
	$scope.userId = $rootScope.userId;
    $scope.userName = $rootScope.userName;
    $scope.userSource = $rootScope.userSource;
	DatabaseFactory.getAllJourneys($rootScope.userId)
	.then(function(allUserData){
        var journeys = allUserData.journeys;
        journeys = journeys.map(function(journey){
            journey.posts = journey.posts.map(function(post){
                post.created = post.created.slice(6,11);
                return post;
            })
            return journey; 
        }) 
        console.log("Journeys to be displayed are:", journeys);
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
