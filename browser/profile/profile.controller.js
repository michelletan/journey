'use strict';

app.controller('ProfileCtrl', function($scope, $state, $stateParams) {
    $scope.profileId = $stateParams.id;

    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';
    $scope.defaultCoverUrl = '/images/landing-feature2.jpg';

    $scope.defaultJourneyTitle = 'Amazing Trip';

    $scope.journeys = [];

    // $scope.journeys = [
    //     {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}
    // ];

    $scope.goToJourney = goToJourney;

    // Public functions
    function goToJourney(id) {
        $state.go('journey', {id: id});
    }
});
