app.controller('NavbarCtrl', function($scope, $mdSidenav, $mdDialog, FacebookFactory) {
  var sidenavId = 'left';

/*  FB.init({
    appId      : '327010674354140',
    cookie     : true,  // enable cookies to allow the server to access
                      // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.7' // use graph api version 2.7
  });*/

  FB.getLoginStatus(function(response) {
    FacebookFactory.statusChangeCallback(response)
    .then(function(nameSourceObj){
      console.log("name and profile pic is: ", nameSourceObj);
      $scope.name = nameSourceObj.name;
      $scope.userPic = nameSourceObj.source;
    })
  });

    $scope.defaultUserPic = '/images/user.png';

    $scope.openSideNav = openSideNav;
    $scope.openDropdownMenu = openDropdownMenu;
    $scope.logout = logout;

    // Public functions
    function openSideNav() {
      $mdSidenav(sidenavId).toggle();
    }

    function openDropdownMenu($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    }

    function logout() {

    }

  });
