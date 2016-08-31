'use strict';

app.controller('FriendsCtrl', function($scope, $state, $stateParams, FacebookFactory) {
    // Redirect users if they haven't logged in
    if($rootScope.userId == null) $state.go('landing');
    

    $scope.id = $rootScope.userId;
    $scope.userName = $rootScope.userName;
    $scope.userSource = $rootScope.userSource;

    FacebookFactory.getFriends()
    .then(function(friends){
        $scope.friends = friends;
    });

});
