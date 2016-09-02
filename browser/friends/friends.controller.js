'use strict';

app.controller('FriendsCtrl', function($scope, $state, $stateParams, FacebookFactory, $rootScope) {
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

    FacebookFactory.getFriends()
    .then(function(friends){
        console.log("friend is: ", friends);
        $scope.friends = friends;
    });

    $scope.friends = [{name: 'Abc'}, {name: 'alkjdflkaf'}, {name: 'kkkkdkk'}];

});
