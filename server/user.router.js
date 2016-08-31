// Grab models from database
var db = require('./db');
var User = db.model('user');
var Journey = db.model('journey');
var Post = db.model('post');

// Bluebird Module to handle Async calls
var Promise = require('bluebird');

// Set up Router
var router = require('express').Router();

// Checking if User Exists, GET request
router.get('/:userId/exists', function(req,res,next){
	var userId = req.params.userId;
	return User.findOne({ where: {id: userId} })
	.then(function(user){
		if(user !== null){
			return res.status(200).send({userExists: true});
		}else{
			return res.status(200).send({userExists: false});
		}
	})
	.catch(next);
});

// Retrieving User Posts, GET request
router.get('/:userId/posts', function(req,res,next){
	var userId = req.params.userId;
	return User.findOne({ 
		where: { id : userId },
		include: [
			{
				model: Journey,
				include: [Post]
			}
		]
	})
	.then(function(allUserData){
		var posts = [];
		var journeys = allUserData.journeys;
		journeys.forEach(function(journey){
			journey.posts.forEach(function(post){
				posts.push(post);
			})
		});
		return res.status(200).send(posts);
	})
	.catch(next);
})


// Retrieving User Journeys, GET request
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
	.then(function(allUserData){
		return res.status(200).send(allUserData);
	})
	.catch(next);
});


// Retrieving One Journey, GET request
router.get('/:userId/journeys/:journeyId', function(req,res,next){
	var journeyId = req.params.journeyId;
	return Journey.findOne({
		where: { id: journeyId },
		include: [Post]
	})
	.then(function(journey){
		return res.status(200).send(journey);
	})
	.catch(next);
});


// First time User, POST request to persist journeys
router.post('/:userId/journeys', function(req,res,next){
	var userId = req.params.userId;
	// Journey Array Basic = journey array without country sources added 
	var journeyArr = req.body.journeys;
	var userName = req.body.userName;
	var userSource = req.body.userSource;
	console.log("Journeys sent by client: ", req.body.journeys);
	// Create User
	return User.create({ 
		id: userId,
		name: userName,
		source: userSource
		 })
	.then(function(newUser){
		console.log("Journeys with source are: ", journeyArr);	
		return Promise.map(journeyArr, function(journey){
			return newUser.createJourney({
				name: journey.name,
				source: journey.source || journey.posts[0].source
			})
			.then(function(createdJourney){
				journey.id = createdJourney.id
				return journey;
			})
		})
	})
	.then(function(updatedJourneyArr){
		console.log("Journeys with db ids are: ", updatedJourneyArr);
		return Promise.map(updatedJourneyArr, function(updatedJourney){
			return Journey.findOne({ where: { id: updatedJourney.id } })
			.then(function(foundJourney){
				return Promise.map(updatedJourney.posts, function(post){
					foundJourney.createPost({
						fbpostid: post.id,
						journeyid: foundJourney.id,
						story: post.story,
						message: post.message,
						source: post.source,
						country: post.country,
						created: post.time,
						likes: post.likes	
					})
				})	
			})
		})
	})
	.then(function(){
		return res.status(200).send("Journeys created");
	})
	.catch(next);
});


// Creating one journey, POST request
router.post('/:userId/createJourney', function(req,res,next){
	var posts = req.body.posts;
	var name = req.body.name;
	var source = posts[0].source;
	return Journey.create({
		name: name,
		source: source
	})
	.then(function(createdJourney){
		return Promise.map(posts, function(post){
			return Post.findOne({ where: { fbid: post.id } })
			.then(function(foundPost){
				if(foundPost!==null){
					return createdJourney.createPost({
						fbpostid: post.id,
						journeyid: createdJourney.id,
						story: post.story,
						message: post.message,
						source: post.source,
						country: post.country,
						created: post.time,
						likes: post.likes				
					});
				}else{
					return foundPost.addJourney(createdJourney)
				}
			});
		})
	})
	.then(function(){
		return res.status(200).send("Journey Created");
	})
	.catch(next);
});

module.exports = router;
