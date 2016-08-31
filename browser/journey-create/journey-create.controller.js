'use strict';

app.controller('JourneyCreateCtrl', function($scope, $state, $stateParams, DatabaseFactory, PixabayFactory, FacebookFactory, $rootScope) {
    $scope.defaultPostPic = '/images/landing-feature2.jpg';

    $scope.todayDate = new Date();

    $scope.countries = [{}, {}, {}];

    // Michelle: Define date1 and date2
    var date1;
    var date2;
    FacebookFactory.getPosts(date1,date2)
    .then(function(posts){
        $scope.posts = posts; 
    })
    
    // Michelle: Define selectedposts
    $scope.selectedPosts = [];

    // Michelle: Should be called when user is done typing in the name field
    $scope.updateJourneyName = function(name){
        $scope.journeyName = name;
    }

    // Michelle: Define coverPhotoCountry
    $scope.coverPhotoCountry;

    PixabayFactory.getCountryImgUrl($scope.coverPhotoCountry)
    .then(function(url){
        $scope.journeySource = url;
    });

    $scope.createJourney = function(){
    	DatabaseFactory.createJourney($rootScope.userId, $scope.journeyName, $scope.selectedPosts, $scope.journeySource);
   	}
});
