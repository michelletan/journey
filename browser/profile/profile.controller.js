'use strict';

app.controller('ProfileCtrl', function($scope, $state, $stateParams) {
    $scope.profileId = $stateParams.id;

    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';
    $scope.defaultCoverUrl = '/images/landing-feature2.jpg';

    $scope.defaultJourneyTitle = 'Amazing Trip';

    $scope.journeys = [
        {}, {}, {}, {}, {}, {}, {}, {}
    ];

    $scope.goToPlace = goToPlace;

    // Public functions
    function goToPlace(id) {
        $state.go('place', {countryId: $stateParams.id, placeId: id});
    }
});
