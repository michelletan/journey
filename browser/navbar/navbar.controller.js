app.controller('NavbarCtrl', function($scope, $rootScope, $mdMedia, $mdSidenav, $mdDialog, FacebookFactory) {
    var sidenavId = 'left';

    $scope.defaultUserId = 1;
    $scope.defaultUserPic = '/images/user.png';
    $scope.defaultUserName = 'User';

    $scope.openSideNav = openSideNav;
    $scope.openDropdownMenu = openDropdownMenu;
    $scope.logout = logout;

    // Prepare important scope variables for the navbar
    FB.getLoginStatus(function(response) {
        FacebookFactory.statusChangeCallback(response)
        .then(function(userObj){
            if(!userObj.id){
                
                return;
            };
            console.log("Displayed user info on navbar should be: ", userObj);
            $scope.userName = userObj.name;
            $scope.userSource = userObj.source;
            $scope.userId = userObj.id;
        })
    });

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            closeSideNav();
    });

    // Public functions
    function openSideNav() {
        $mdSidenav(sidenavId).open();
    }

    function closeSideNav() {
        $mdSidenav(sidenavId).close();
    }

    function openDropdownMenu($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    }

    function logout() {
        $scope.userId = null;
        $scope.userSource = null;
        $scope.userName = null;
        FacebookFactory.logOutFb();
    }

});
