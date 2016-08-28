'use strict';

app.controller('JourneyCtrl', function($scope, $state, $stateParams) {
    $scope.profileId = $stateParams.id;

    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';
    $scope.defaultCoverUrl = '/images/landing-feature2.jpg';

    $scope.defaultJourneyTitle = 'Amazing Trip';
    $scope.defaultPostPic = '/images/landing-feature2.jpg';

    $scope.journey = {
        posts: [1, 2, 3]
    };
});
