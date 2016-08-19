'use strict';

app.controller('LandingCtrl', function($scope, $state, $stateParams, facebookFactory) {
    $scope.spreadImagePath = 'https://dl.dropboxusercontent.com/s/70lkgfzcrb0hagu/munich-1220908.jpg?dl=0';//'https://dl.dropboxusercontent.com/s/34vnqzdl7k1x6ak/spread.jpg?dl=0';

    $scope.imageFeature1Path = 'https://dl.dropboxusercontent.com/s/7oj274ereyxpkxd/landing-feature1.jpg?dl=0';
    $scope.imageFeature2Path = 'https://dl.dropboxusercontent.com/s/mnecwpd5a1qctmt/landing-feature2.jpg?dl=0';
	$scope.imageFeature3Path = 'https://dl.dropboxusercontent.com/s/rngr2ta7lx1labe/landing-feature3.jpg?dl=0';

	$scope.logIntoFb = logIntoFb;
	function logIntoFb(){
		facebookFactory.logIntoFb();
	}

});
