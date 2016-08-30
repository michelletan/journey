app.factory('DatabaseFactory', function($http){
	var DatabaseFactory = {};

	DatabaseFactory.getAllJourneys = function(userId){
		return $http.get('/user/' + userId + '/journeys')
		.then(function(response){
			return response.data;
		})
	}

	DatabaseFactory.getJourney = function(userId,journeyId){
		return $http.get('/user/' + userId + '/journeys' + journeyId)
		.then(function(response){
			return response.data;
		})
	}

	DatabaseFactory.createJourneys = function(userId, journeyArr){
		return $http.post('/user/' + userId + '/journeys', {journeys: journeyArr})
		.then(function(response){
			console.log("Newly persisted data is: ", response.data);
			return response.data;
		})
	}

	return DatabaseFactory;
})