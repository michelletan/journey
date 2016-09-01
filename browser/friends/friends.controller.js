'use strict';

app.controller('FriendsCtrl', function($scope, $state, $stateParams) {
    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
	$scope.defaultUserName = 'User';

    $scope.friends = [
        {name: 'Abc'}, {name: 'daffff'}, {name: 'eeeee'}, {name: 'ffff'}, {name: 'ggg'}, {name: 'Ahhhbc'}, {name: 'iiii'}, {name: 'jj'}
    ];

    $scope.inviteFriend = inviteFriend;

    // Public functions
    function inviteFriend(name) {
        console.log('invite friend ' + name);
    }

});
