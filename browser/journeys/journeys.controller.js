'use strict';

app.controller('JourneysCtrl', function($scope, $state, $stateParams, DatabaseFactory, $rootScope){

    // We use stateParams.userId because we're not necessarily rendering the user's own journeys -- we could be displaying his/her friend's journeys
    DatabaseFactory.getAllJourneys($stateParams.userId)
    .then(function(allUserData){
        var journeys = allUserData.journeys;
        journeys = journeys.map(function(journey){
            journey.posts = journey.posts.map(function(post){
                post.created = post.created.slice(5,10);
                return post;
            })
            return journey;
        })
        console.log("Journeys Page Traveller Info:", allUserData);
        $scope.journeys = journeys;

        $scope.userId = allUserData.id;
        $scope.userName = allUserData.name;
        $scope.userSource = allUserData.source;

        // Checks if the "displayed traveller" is the user or a friend
        if($stateParams.id == $rootScope.userId){
            $scope.travellerName = "My";
        }else{
            $scope.travellerName = $scope.userName + "'s";
        }
    });

    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';
    $scope.defaultCoverUrl = '/images/landing-feature2.jpg';
    $scope.defaultJourneyTitle = 'Amazing Trip';

});
