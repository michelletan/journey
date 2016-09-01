'use strict';

app.controller('JourneyCtrl', function($scope, $state, $stateParams, DatabaseFactory, $rootScope) {

    $scope.userId = $rootScope.userId;
    $scope.userName = $rootScope.userName;
    $scope.userSource = $rootScope.userSource;

    DatabaseFactory.getJourney($rootScope.userId,$stateParams.journeyId)
    .then(function(journey){
        $scope.journey = journey;
    });

    $scope.profileId = $stateParams.id;

    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';
    $scope.defaultCoverUrl = '/images/landing-feature2.jpg';

    $scope.defaultJourneyTitle = 'Amazing Trip';
    $scope.defaultPostPic = '/images/landing-feature2.jpg';

});
