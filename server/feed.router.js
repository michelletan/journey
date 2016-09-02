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
		include: [User],
		where: {
			user_id: {
				$in: friendsIdArr
			}
		}
	})
	.then(function(journeys){
		return res.status(200).send(journeys);
	})
	.catch(next);
})

module.exports = router;
