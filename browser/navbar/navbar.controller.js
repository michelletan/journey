app.controller('NavbarCtrl', function($scope, $mdSidenav) {
    var sidenavId = 'left';
    var menuOptions = [{
      icon: 'settings',
      name: 'Explore'
    }, {
      icon: 'settings',
      name: 'My Journeys'
    }];

    $scope.userPic = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/624693/profile/profile-80_1.jpg'; // placeholder
    $scope.menu = menuOptions;
    $scope.openSideNav = openSideNav;

    // Public functions
    function openSideNav() {
      $mdSidenav(sidenavId).toggle();
    }

});
