'use strict';

app.controller('FriendsCtrl', function($scope, $state, $stateParams, FacebookFactory, $rootScope) {
    // Redirect users if they haven't logged in
    if($rootScope.userId == null) $state.go('landing');
    
    FacebookFactory.getFriends()
    .then(function(friends){
        console.log("friend is: ", friends);
        $scope.friends = friends;
    });

});