app.factory('DatabaseFactory', function($http){
	var DatabaseFactory = {};

	DatabaseFactory.getAllJourneys = function(userId){
		return $http.get('/user/' + userId + '/journeys')
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
		return $http.post('/user/' + userId + '/journeys', {journeys: journeyArr})
		.then(function(response){
			return response.data;
		})
	}

	return DatabaseFactory;
})