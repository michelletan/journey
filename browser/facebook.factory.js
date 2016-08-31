
app.factory('FacebookFactory', function($q, PixabayFactory, DatabaseFactory, $rootScope){
	var FacebookFactory = {}

	// Declaring "global window" variables, so that we can rapidly grab user info on front-end
	$rootScope.userId = null;
	$rootScope.userName = null;
	$rootScope.userSource = null;

	var toPrint = "";

  
	FacebookFactory.statusChangeCallback = function(response) {
		console.log('statusChangeCallback');
		console.log(response);
		// The response object is returned with a status field that lets the
		// app know the current login status of the person.
		// Full docs on the response object can be found in the documentation
		// for FB.getLoginStatus().
		if (response.status === 'connected') {
		  // Logged into your app and Facebook.
		  if(document.getElementById("logInLanding")!=undefined)
			document.getElementById("logInLanding").style.display = 'none';
		  // When we are connected,
		  return FacebookFactory.whenConnected()
		  // We set global variables 
		  .then(function(userObj){
		  	console.log("whenConnected resolves with the value: ", userObj);
		  	$rootScope.userId = userObj.id;
		  	$rootScope.userName = userObj.name;
		  	$rootScope.userSource = userObj.source;
		  })
		  // Check if user already exists on our db
		  .then(function(){
		  	console.log("Going to check existence of userId: ", $rootScope.userId);
		  	return DatabaseFactory.checkExistence($rootScope.userId)
		  	.then(function(data){
		  		if(data.userExists == false){
		  			// Generate and Persist (POST) Journeys 
		  			return FacebookFactory.generateJourneyWS()
		  			.then(function(journeys){
		  				return DatabaseFactory.persistJourneys($rootScope.userId, journeys);
		  			})
		  		}else{
		  			// If user already exists, don't have to persist anything.		  			
		  		}
		  	})
		  })

		} else if (response.status === 'not_authorized') {
		  // The person is logged into Facebook, but not your app.
		  if(document.getElementById("logInLanding")!=undefined)
			document.getElementById("logInLanding").style.display = 'block';
		  
		} else {
		  // The person is not logged into Facebook, so we're not sure if
		  // they are logged into this app or not.
		  if(document.getElementById("logInLanding")!=undefined)
			document.getElementById("logInLanding").style.display = 'block';
		  
		}
	}

	FacebookFactory.whenConnected = function(){
		var	deferred = $q.defer(); 
		FB.api('me?fields=name,id,picture.type(large)', function(response) {
			if(!response || response.error){
				deferred.resolve({
					name: "Default Name",
					source: "http://resources.mynewsdesk.com/image/upload/t_next_gen_article_large_480/cf0i7zl5zl1vmle1c0fp.jpg",
					id: "1234321"
				});
			}else{
				deferred.resolve({
					name: response.name,
					source: response.picture.data.url,
					id: response.id
				});
			}	
		});
		return deferred.promise;
	}


	FacebookFactory.logIntoFb = function(){	
		checkLoginState();
		 FB.login(function(response) {
		   checkLoginState();
		 }, {scope: 'public_profile,email,user_tagged_places,user_friends'});
	}
	
	FacebookFactory.logOutFb = function(){
		checkLoginState();
		FB.logout(function(response) {
		  //logout processing here
		  //Clearing rootscope variables
	  	$rootScope.userId = null;
	  	$rootScope.userName = null;
	  	$rootScope.userSource = null;
		});
	}
	
	FacebookFactory.getPlacePic = function(idStr){
		var deferred = $q.defer(); 
		var query = idStr+"?fields=name,cover,picture.type(large)"
		FB.api(query, function(response){
			var place = response;
			var name = place.name;
			var src;
			if(!place.cover){
				src = place.cover.source;
			}else if(place.picture != undefined){
				src = place.picture.data.url;
			}else{
				src = "";
			}
			deferred.resolve({
				name: name,
				source: src
			});
		});
		return deferred.promise;
	};

	var generateJourney = function(){
		var deferred = $q.defer();
		var query ='me/feed?fields=id,created_time,story,message,likes.limit(0).summary(true),place,full_picture&since=';
		query+= FacebookFactory.getLastYear();
		query+='&limit=1000';
		FB.api(query, function(response) {
			var currCountry ="";
			var journeys = [];
			var journeyCount = -1;
			var posts = response.data;
			for(i =0; i<posts.length; i++){
				var qPost = posts[i];
				//check if post has place
				if(qPost.place!=undefined){
					var qCountry = qPost.place.location.country;
					if(qCountry != undefined){
						var newJourney;
						//alert(qCountry);
						if(qCountry != currCountry){
							journeyCount++;
							currCountry = qCountry;
							newJourney = {};
							newJourney.name = qCountry;
							newJourney.posts = [];
							journeys.push(newJourney);
						}
						var newPost = copyPost(qPost);
						newJourney.posts.push(newPost);
					}
				}
			}
			//console.log(journeys);
			deferred.resolve(journeys);
		});
		return deferred.promise;
	}

	FacebookFactory.generateJourneyWS = function(){
		return generateJourney()
		.then(function(journeys){ 
			return $q.map(journeys, function(journey){ 
				console.log(journey);
				return PixabayFactory.getCountryImgUrl(journey.name)
				.then(function(url){
					journey.source = url;
					console.log(journey);
					return journey;
				});
			});
		});
	}


	FacebookFactory.getLastYear = function(){
		var lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
		var returnVal = lastYear.getFullYear()+"-"+lastYear.getMonth()+"-"+lastYear.getDate()+"T00:00:00";
		//alert(returnVal);
		return returnVal;
	}

	var copyPost = function(qPost){
		var newPost = {};
		newPost.id = qPost.id;
		newPost.time = qPost.created_time;
		newPost.story = qPost.story;
		newPost.message = qPost.message;
		if(qPost.full_picture!= undefined){
			newPost.src = qPost.full_picture;
		}
		newPost.likes = qPost.likes.summary.total_count;
		newPost.country = qPost.place.location.country;
		return newPost;
	}


	  // This function is called when someone finishes with the Login
	  // Button.  See the onlogin handler attached to it in the sample
	  // code below.
	  function checkLoginState() {
	  	// Checks if user is logged in ON facebook
	  	FB.getLoginStatus(function(response) {
	  		statusChangeCallback(response);
	  	});
	  }

	  // Load the SDK asynchronously
	  (function(d, s, id) {
	  	var js, fjs = d.getElementsByTagName(s)[0];
	  	if (d.getElementById(id)) return;
	  	js = d.createElement(s); js.id = id;
	  	js.src = "//connect.facebook.net/en_US/sdk.js";
	  	fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));


	  return FacebookFactory;


	})

