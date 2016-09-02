// Grab models from database
var db = require('./db');
var User = db.model('user');
var Journey = db.model('journey');
var Post = db.model('post');

// Bluebird Module to handle Async calls
var Promise = require('bluebird');

// Set up Router
var router = require('express').Router();

router.post('/', function(req,res,next){
	var friendsIdArr = req.body.friendsIdArr;
	return Journey.findAll({
		order: 'created DESC',
		include: [User]
	})
	.then(function(journeys){
		// Filter journey out if it does not belong to a user's friend
		journeys = journeys.filter(function(journey){
			return (friendsIdArr.indexOf(journey.user.id) > -1);
		})	
		console.log("Server sending feed: ", journeys);
		res.status(200).send(journeys);
	})
	.catch(next);
})

module.exports = router;
