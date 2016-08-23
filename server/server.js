'use strict';
var express = require('express');
var app = express();
var path = require('path');

var database = require('./db.js');

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
		throw err;
	}else{
		// IMPORTANT: Remove force true when we actually deploy!
		database.db.sync({ force: true })
		.then(function(){
			console.log("Database is synced.");
		})
		.then(function(){
			console.log('Journey server is up. Listening on port: ', port);
		})
	}
})
