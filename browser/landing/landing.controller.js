'use strict';

app.controller('LandingCtrl', function($scope, $rootScope, $state, $stateParams, FacebookFactory) {
   
    $scope.spreadImagePath = '/images/landing-spread.jpg';//'https://dl.dropboxusercontent.com/s/34vnqzdl7k1x6ak/spread.jpg?dl=0';

    $scope.imageFeature1Path = '/images/landing-feature1.jpg';
    $scope.imageFeature2Path = '/images/landing-feature2.jpg';
		$scope.imageFeature3Path = '/images/landing-feature3.jpg';

	$scope.logIntoFb = function(){
		FacebookFactory.logIntoFb();
	}

});
