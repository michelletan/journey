app.controller('NavbarCtrl', function($scope, $mdSidenav, facebookFactory) {
  var sidenavId = 'left';
  var menuOptions = [{
    icon: 'settings',
    name: 'Explore'
  }, {
    icon: 'settings',
    name: 'My Journeys'
  }];

	  console.log("testing");
    FB.init({
      appId      : '327010674354140',
      cookie     : true,  // enable cookies to allow the server to access 
                        // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.7' // use graph api version 2.7
    });
	  console.log("testing2");

    FB.getLoginStatus(function(response) {
      facebookFactory.statusChangeCallback(response)
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
