// Grab models from database
var db = require('./db');
var User = db.model('user');
var Journey = db.model('journey');
var Post = db.model('post');

// Bluebird Module to handle Async calls
var Promise = require('bluebird');

// Set up Router
var router = require('express').Router();

router.get('/', function(req,res,next){
	Journey.findAll({
		include: [Post]
	})
	.then(function(journeys){
		// Updates journeys with a date taken from the first post of the journey
		journeys = journeys.map(function(journey){
			journey.created = journey.posts[0].created;
			return journey;
		});
		// Sorts them by date
		journeys.sort(function(a, b) {
    	return b.created - a.created;
		});
		return journeys;
	})
	.then(function(updatedJourneys){
		return Promise.map(updatedJourneys, function(updatedJourney){
			return updatedJourney.getUser()
			.then(function(user){
				updatedJourney.user = user;
				return updatedJourney;
			})
		})
	})
	.then(function(updatedJourneysWithUsers){
		console.log("Server sending feed: ", updatedJourneysWithUsers);
		res.status(200).send(updatedJourneysWithUsers);
	})
})

module.exports = router;
