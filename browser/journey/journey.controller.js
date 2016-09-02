'use strict';

app.controller('JourneyCtrl', function($scope, $state, $stateParams, DatabaseFactory, $rootScope,FacebookFactory) {

    // $scope.journey = {posts: [{}, {}, {}]};

    DatabaseFactory.getUserBasicData($stateParams.userId)
    .then(function(user){
        $scope.userId = user.id;
        $scope.userName = user.name;
        $scope.userSource = user.source;
    })

    DatabaseFactory.getJourney($rootScope.userId,$stateParams.journeyId)
    .then(function(journey){
        console.log("Journey to be displayed is:", journey);
        $scope.journey = journey;
    });

    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';
    $scope.defaultCoverUrl = '/images/landing-feature2.jpg';

    $scope.defaultJourneyTitle = 'Amazing Trip';
    $scope.defaultPostPic = '/images/landing-feature2.jpg';

	$scope.shareJourney = function(uName, jID,jName,jSrc, posts){
		if (uName == $rootScope.userName){
			FacebookFactory.shareJourney(jID,jName,jSrc,posts);
		}else{
			FacebookFactory.postOpenGraph(uName, jID,jName, jSrc,posts);
		}
	}

});
