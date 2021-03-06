'use strict';
var express = require('express');
var app = express();
var path = require('path');
var Promise = require('bluebird');
var db = require('./db.js');
var bodyParser = require('body-parser')
var morgan = require('morgan')

/* ---- BODYPARSER BOILERPLATE ---- */
// Lets us use parse POST request bodies as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ---- LOGGING BOILERPLATE ---- */
app.use(morgan('dev'));

/* ---- ROUTES HERE ---- */
// Routes for static files
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

app.use('/bower_components', express.static(__dirname + '/../bower_components'));
app.use('/browser', express.static(__dirname + '/../browser'));
app.use('/images', express.static(__dirname + '/../images'));

// Routers to other routers
app.use('/user', require('./user.router.js'));
app.use('/feed', require('./feed.router.js'));

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
		})
		.then(function(){
			console.log('Journey server is up. Listening on port: ', port);
		})
	}
})
