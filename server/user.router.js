// Grab models from database
var db = require('./db');
var User = db.model('user');
var Journey = db.model('journey');
var Post = db.model('post');

// Request Module to make Pixabay API calls 
var rp = require('request-promise');

// Bluebird Module to handle Async calls
var Promise = require('bluebird');

// Set up Router
var router = require('express').Router();

// Retrieving User Journeys
router.get('/:userId/journeys', function(req,res,next){
	var userId = req.params.userId;
	return User.findOne({ 
		where: { id: userId }, 
		include: [
			{
				model: Journey,
				include: [Post]
			}
		]
	})
	.catch(next);
});


// Retrieving One Journey
router.get('/:userId/journeys/:journeyId', function(req,res,next){
	var journeyId = req.params.userId;
	return Journey.findOne({
		where: { id: journeyId },
		include: [Post]
	})
	.catch(next);
});


// First time User -- Persisting User Journeys
router.post('/:userId/journeys', function(req,res,next){
	var pixabayApiKey = '3129951-64f23563232747f3a8f3bb9b9';
	var pixabayBaseUrl = "https://pixabay.com/api/?key="+pixabayApiKey+"&q=";
	var userId = req.params.userId;
	// Journey Array Basic = journey array without country sources added 
	var journeyArrBasic = req.body;

	// Adds a source to each country
	var journeyArrProm = Promise.map(journeyArrBasic, function(journey){
		var countryName = journey.name;
		var pixabayRequest = pixabayBaseUrl + countryName;  
		return rp(pixabayRequest)
		.then(function(response){
			if(response.data.hits.length>0){
				journey.source = response.data.hits[0].webformatURL;
			}else{
				journey.source = "http://moneysavingdude.com/wp-content/uploads/2014/03/save-money-by-traveling-by-plane.jpg"
			}
			return journey;
		})
	})
	// Check if user already exists on database
	return User.findAll({ where: { id: userId } })
	.then(function(foundUser){
		if(foundUser){
			return res.status(409).send("User already exists");
		}else{
			// Create User
			var userProm = User.create({ id: userId });
			return Promise.all([journeyArrProm, userProm])
			.spread(function(journeyArr, newUser){
				console.log("Journeys with source is: ", journeyArr);	
				// For each journey in the journeyArr
				return Promise.map(journeyArr, function(journey){
					// Create a journey instance
					return newUser.createJourney({
						name: journey.name,
						source: journey.source
					})
					.then(function(createdJourney){
						return Promise.map(createdJourney.posts, function(post){
							createdJourney.createPost({
								fbpostid: post.id,
								journeyid: createdJourney.id,
								story: post.story,
								message: post.message,
								source: post.source,
								country: post.country,
								created: post.time,
								likes: post.likes
							})
						});
					})
				})
			})
		}
	})
	.catch(next);
});


module.exports = router;
