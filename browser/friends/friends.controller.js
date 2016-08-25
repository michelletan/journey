'use strict';

app.controller('FriendsCtrl', function($scope, $state, $stateParams) {
    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
	$scope.defaultUserName = 'User';

    $scope.friends = [
        {}, {}, {}, {}, {}, {}
    ];

});
