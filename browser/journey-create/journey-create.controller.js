'use strict';

app.controller('JourneyCreateCtrl', function($scope, $state, $stateParams, DatabaseFactory, FacebookFactory, $rootScope) {
    $scope.defaultPostPic = '/images/landing-feature2.jpg';

    $scope.todayDate = new Date();

    $scope.countries = [{}, {}, {}];

    $scope.posts = []; // <-- Ten will provide some async function here

    $scope.selectedPosts = [];

    $scope.journeyName = "";
    
    $scope.updateJourneyName = function(name){
        $scope.journeyName = name;
    }

    $scope.journeySource = "";

    $scope.createJourney = function(){
        // Michelle: You can call createJourney, but you have to make sure to pass the correct journeyName, journeySource, and selectedPosts (an array of posts the user wants)  
    	DatabaseFactory.createJourney($rootScope.userId, $scope.journeyName, $scope.selectedPosts, $scope.journeySource);
   	}
});
