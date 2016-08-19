'use strict';

app.directive('navbar', function($state) {
	return {
		restrict: 'E',
		templateUrl: '/browser/navbar/navbar.html',
		controller: 'NavbarCtrl'
	}
});
