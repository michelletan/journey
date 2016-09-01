'use strict';

app.controller('JourneysCtrl', function($scope, $state, $stateParams, DatabaseFactory, $rootScope){
    // Redirect users if they haven't logged in
    if($rootScope.userId == null) $state.go('landing');

    $scope.userId = $rootScope.userId;
    $scope.userName = $rootScope.userName;
    $scope.userSource = $rootScope.userSource;

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
        console.log("Journeys to be displayed are:", journeys);
        $scope.journeys = journeys;
    });

    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';
    $scope.defaultCoverUrl = '/images/landing-feature2.jpg';
    $scope.defaultJourneyTitle = 'Amazing Trip';

});
