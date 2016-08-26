// Grab models from database
var db = require('./db');
var User = db.model('user');
var Journey = db.model('journey');
var Country = db.model('country');
var Post = db.model('post');

// Request Module to make Pixabay API calls 
var rp = require('request-promise');

// Bluebird Module to handle Async calls
var Promise = require('bluebird');

// Set up Router
var router = require('express').Router();

// First time User Request
router.post('/:userId/journeys', function(req,res,next){
	var pixabayApiKey = '3129951-64f23563232747f3a8f3bb9b9';
	var pixabayBaseUrl = "https://pixabay.com/api/?key="+pixabayApiKey+"&q=";
	var userId = req.params.userId;
	// Journey Array Basic = journey array without country sources added 
	var journeyArrBasic = req.body;

	// Adds a source to each country
	var journeyArrProm = Promise.map(journeyArrBasic, function(journey){
		var countryName = journey.country;
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
	User.findAll({ where: { id: userId } })
	.then(function(foundUser){
		if(foundUser){
			res.status(409).send("User already exists");
		}else{
			// Create User
			var userProm = User.create({ id: userId });
			Promise.all([journeyArrProm, userProm])
			.spread(function(journeyArr, newUser){	
				// For each journey in the journeyArr
				Promise.map(journeyArr, function(journey){
					// Create a journey instance
					return newUser.createJourney({
						name: journey.country
					})
					// Create a country instance
					.then(function(newJourney){
						return newJourney.createCountry({
							name: journey.country,
							source: journey.source
						});
					})
					.then(function(newCountry){
						return Promise.each(journey.posts, function(post){
							newCountry.createPost({
								id: post.id,
								story: post.story,
								message: post.message,
								source: post.source,
								created: post.time
							})
						});
					})
					.catch(next);
				});
			});
		}
	});

});

module.exports = router;
