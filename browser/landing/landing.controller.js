'use strict';

app.controller('LandingCtrl', function($scope, $state, $stateParams, facebookFactory) {
    $scope.imagePath = 'http://dl.dropboxusercontent.com/s/9x8tfh5hy8go4wk/landing-photo.jpg?dl=0'; // placeholder

    $scope.imageFeature1Path = 'https://dl.dropboxusercontent.com/s/7oj274ereyxpkxd/landing-feature1.jpg?dl=0';
    $scope.imageFeature2Path = 'https://dl.dropboxusercontent.com/s/mnecwpd5a1qctmt/landing-feature2.jpg?dl=0';
	$scope.imageFeature3Path = 'https://dl.dropboxusercontent.com/s/rngr2ta7lx1labe/landing-feature3.jpg?dl=0';

	$scope.logIntoFb = logIntoFb;
	function logIntoFb(){
		facebookFactory.logIntoFb();
	}

});

