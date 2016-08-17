'use strict';

app.directive('navbar', function($state){
	return {
		restrict: 'E',
		templateUrl: '/browser/navbar/navbar.html',
		link: function(scope){
			//Todo: $scope of navbar?
			scope.goToHome = function () {
				$state.go('home');
			}
		}
	}	
});
