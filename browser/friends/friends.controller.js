'use strict';

app.controller('FriendsCtrl', function($scope, $state, $stateParams, FacebookFactory, $rootScope) {
    // Redirect users if they haven't logged in
		FacebookFactory.checkLoginState()
		.then(function(userObj){
			if(!userObj.id) return;
			$scope.userId = userObj.id;
			$scope.userName = userObj.name;
			$scope.userSource = userObj.source;
		})

    FacebookFactory.getFriends()
    .then(function(friends){
        console.log("friend is: ", friends);
        $scope.friends = friends;
    });

    $scope.friends = [{name: 'Abc'}, {name: 'alkjdflkaf'}, {name: 'kkkkdkk'}];

});
