'use strict';

// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, FacebookFactory, $q){
	// Defaults
	$scope.defaultUserPic = '/images/user.png';
	$scope.defaultSpreadPic = '/images/landing-spread.jpg';
	$scope.defaultUserName = 'User';

	$scope.posts = [{}, {}, {}];

	$scope.countries = [{name: 'Thailand'}, {name: 'Russia'}, {name: 'China'}];

});
