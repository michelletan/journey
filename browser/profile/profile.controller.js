'use strict';

app.controller('ProfileCtrl', function($scope, $state, $stateParams, DatabaseFactory, $rootScope){
    // Redirect users if they haven't logged in
    FB.getLoginStatus(function(response) {
        FacebookFactory.statusChangeCallback(response)
        .then(function(userObj){
                if(!userObj.id) return;
            $scope.userName = userObj.name;
            $scope.userSource = userObj.source;
            $scope.userId = userObj.id;
        })
    });


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
        console.log("Profile Page Info:", allUserData);
        $scope.journeys = journeys;

        $scope.userId = allUserData.id;
        $scope.userName = allUserData.name;
        $scope.userSource = allUserData.source;
    });

    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';
    $scope.defaultCoverUrl = '/images/landing-feature2.jpg';
    $scope.defaultJourneyTitle = 'Amazing Trip';

});
