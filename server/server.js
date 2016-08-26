'use strict';
var express = require('express');
var app = express();
var path = require('path');
var Promise = require('bluebird');
var db = require('./db.js');

/* ---- ROUTES HERE ---- */
// Routes for static files
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

app.use('/bower_components', express.static(__dirname + '/../bower_components'));
app.use('/browser', express.static(__dirname + '/../browser'));
app.use('/images', express.static(__dirname + '/../images'));

app.use('/user', require('./user.router.js'));

// If the client does not hit any of the above routes, we direct them to index.html  
app.get('/*', function(req,res, next){
	res.sendFile(path.join(__dirname, '/../browser/index.html'));
});

// Error handling function 
app.use(function(err, req, res, next){
	console.log(err);
	res.status(err.status || 500).send(err.message || 'Internal Server Error.');
});

/* ---- END OF ROUTES ---- */


// All routes have already been defined, server is ready to listen
var port = 8080;
app.listen(port, function(err) {
	if(err){
		throw err
	}else{
		// IMPORTANT: Force true clears database. Remove force true when we deploy.
    db.sync({ force: true })
    .then(function(){
			console.log("Database reset and models synced.");
/*			var userProm = db.model('user').create({
				id: 123
			});

			var journeyProm = db.model('journey').create({
				name: 'Japan'
			});

			var countryProm = db.model('country').create({
				name: 'Japan'
			});

			var postProm = db.model('post').create({
				id: 456,
				story: 'Ten Zhi Yang was at Tokyo, Japan.'
			});

			return Promise.all([userProm, journeyProm, countryProm, postProm])
			.spread(function(user, journey, country, post){
				console.log("Now creating test instance...")
				return user.addJourney(journey)
				.then(function(){
					journey.addCountry(country)
				})
				.then(function(){
					country.addPost(post)
				})
			})
			.then(function(){
				console.log('Test instance was created.');
			})*/
		})
		.then(function(){
			console.log('Journey server is up. Listening on port: ', port);
		})
	}
})
