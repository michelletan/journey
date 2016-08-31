'use strict';

app.controller('JourneyCreateCtrl', function($scope, $state, $stateParams, DatabaseFactory, $rootScope) {
    $scope.defaultPostPic = '/images/landing-feature2.jpg';

    $scope.countries = [{}, {}, {}];

    DatabaseFactory.getAllPosts($rootScope.userId)
    .then(function(posts){
    	$scope.posts = posts;
    })

    $scope.selectedPosts = [];

    // Michelle you'll need note the arguments taken by DatabaseFactory.createJourney
    $scope.journeyName = "";
    $scope.journeySource = "";

    $scope.createJourney = function(){
    	DatabaseFactory.createJourney($rootScope.userId, $scope.journeyName, $scope.selectedPosts, $scope.journeySource);
   	}
});
