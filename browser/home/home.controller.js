'use strict';

// Both HomeController and CountryController use the CountryFactory
app.controller('HomeCtrl', function($scope, $state, $stateParams, FacebookFactory, $q){

/*	var fake = [{
		source: 'http://www.gluckman.com/UB-1658.jpg',
		name: 'Mongolia'
	},
	{
		source: 'http://goldenvipworld.com/images/prodotti/russia/16.jpg',
		name: 'Russia'
	},
	{
		source: 'http://cdn.lolwot.com/wp-content/uploads/2015/02/18-must-see-places-in-the-world-1.jpg',
		name: 'United States'
	},
	{
		source: 'https://www.singaporeair.com/saar5/images/navigation/plan-travel/packages/singapore-stopover-holiday.jpg',
		name: 'Singapore'
	}];

	$scope.fakeCountries = fake;*/

	$scope.defaultUserPic = '/images/user.png';
	$scope.defaultSpreadPic = '/images/landing-spread.jpg';
	$scope.defaultUserName = 'User';

	$scope.posts = [1, 2, 3];

});
