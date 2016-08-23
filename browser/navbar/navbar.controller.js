app.controller('NavbarCtrl', function($scope, $mdSidenav, FacebookFactory) {
  var sidenavId = 'left';
  var menuOptions = [{
    icon: 'settings',
    name: 'Explore'
  }, {
    icon: 'settings',
    name: 'My Journeys'
  }];

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



/*
    $scope.userPic = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/624693/profile/profile-80_1.jpg'; // placeholder*/
    $scope.menu = menuOptions;
    $scope.openSideNav = openSideNav;

    // Public functions
    function openSideNav() {
      $mdSidenav(sidenavId).toggle();
    }

  });
