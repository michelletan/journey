'use strict';

app.controller('JourneyCreateCtrl', function($scope, $rootScope, $state, $stateParams, DatabaseFactory, FacebookFactory, PixabayFactory) {
    $scope.defaultPostPic = '/images/landing-feature2.jpg';

    $scope.todayDate = new Date();

    $scope.countries = [{name: 'Malaysia'}, {name: 'Thailand'}, {name: 'England'}];

    $scope.posts = [{}, {},{},{}]; // <-- Ten will provide some async function here

    $scope.selectedPosts = [];

    $scope.journeyName = "";

    $scope.updateJourneyName = function(name){
        $scope.journeyName = name;
    }

    $scope.journeyCoverCountry = $scope.countries[0].name;

    $scope.getJourneyCoverPhoto = function() {

        PixabayFactory.getCountryImgUrl($scope.journeyCoverCountry)
        .then(function(url){
            $scope.journeyCoverPhoto = url;
        });
    }

    $scope.createJourney = function(){
        // Michelle: You can call createJourney, but you have to make sure to pass the correct journeyName, journeySource, and selectedPosts (an array of posts the user wants)
        DatabaseFactory.createJourney($rootScope.userId, $scope.journeyName, $scope.selectedPosts, $scope.journeyCoverPhoto);
    }
});
