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
		// Gives journeys a date taken from the first post of the journey
		journeys = journeys.map(function(journey){
			journey.created = journey.posts[0].created;
			return journey;
		});
		// Sorts them by date
		journeys.sort(function(a, b) {
    	return a.created - b.created;
		});
		console.log("Server sending feed: ", journeys);
		res.status(200).send(journeys);
	});
})


module.exports = router;
