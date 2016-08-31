'use strict';

app.controller('JourneysCtrl', function($scope, $state, $stateParams, DatabaseFactory, $rootScope){
	$scope.userId = $rootScope.userId;
    $scope.userName = $rootScope.userName;
    $scope.userSource = $rootScope.userSource;
	DatabaseFactory.getAllJourneys($rootScope.userId)
	.then(function(journeys){
        if(journeys !== null){
            $scope.journeys = journeys;
        }else{
            $scope.journeys = [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}];
        }
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
