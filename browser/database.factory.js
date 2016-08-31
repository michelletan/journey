app.factory('DatabaseFactory', function($http, $rootScope){
	var DatabaseFactory = {};

	DatabaseFactory.getAllJourneys = function(userId){
		return $http.get('/user/' + userId + '/journeys')
		.then(function(response){
			return response.data;
		})
	}

	DatabaseFactory.getAllPosts = function(userId){
		return $http.get('/user/' + userId + '/posts')
		.then(function(response){
			return response.data;
		})
	}

	DatabaseFactory.checkExistence = function(userId){
		return $http.get('/user/' + userId + '/exists')
		.then(function(response){
			return response.data.userExists;
		})
	}

	DatabaseFactory.getJourney = function(userId,journeyId){
		return $http.get('/user/' + userId + '/journeys' + journeyId)
		.then(function(response){
			return response.data;
		})
	}

	DatabaseFactory.persistJourneys = function(userId, journeyArr){
		return $http.post('/user/' + userId + '/journeys', {journeys: journeyArr,
			userName: $rootScope.userName,
			userSource: $rootScope.userSource
		})
		.then(function(response){
			return response.data;
		})
	}

	DatabaseFactory.createJourney = function(userId, name, posts, source){
		return $http.post('/user' + userId + '/createJourney', {name: name, posts: posts, source: source})
		.then(function(response){
			return response.data;
		})
	}

	return DatabaseFactory;
})