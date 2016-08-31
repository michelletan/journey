'use strict';

app.controller('FriendsCtrl', function($scope, $state, $stateParams, FacebookFactory) {

    $scope.id = $rootScope.userId;
    $scope.userName = $rootScope.userName;
    $scope.userSource = $rootScope.userSource;

    FacebookFactory.getFriends()
    .then(function(friends){
        $scope.friends = friends;
    });

});
