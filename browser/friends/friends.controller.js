'use strict';

app.controller('FriendsCtrl', function($scope, $state, $stateParams, FacebookFactory, $rootScope) {
    // Redirect users if they haven't logged in
    if ($rootScope.userId == null) {
        $state.go('landing');
    }

    $scope.friends = [
        {name: 'Abc'}, {name: 'daffff'}, {name: 'eeeee'}, {name: 'ffff'}, {name: 'ggg'}, {name: 'Ahhhbc'}, {name: 'iiii'}, {name: 'jj'}
    ];
});
