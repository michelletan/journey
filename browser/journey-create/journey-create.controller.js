'use strict';

app.controller('JourneyCreateCtrl', function($scope, $state, $stateParams) {
    $scope.defaultPostPic = '/images/landing-feature2.jpg';

    $scope.todayDate = new Date();

    $scope.countries = [{}, {}, {}];

    $scope.posts = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
});
