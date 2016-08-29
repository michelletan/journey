app.factory('FacebookFactory', function($q){
	var FacebookFactory = {}

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
		  return FacebookFactory.whenConnected();
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
		FB.api('me?fields=name,picture.type(large)', function(response) {
			if(!response || response.error){
				deferred.reject('Error occurred');
			}else{
				deferred.resolve({
					name: response.name,
					source: response.picture.data.url
				});
			}	
		});
		return deferred.promise;
	}

	FacebookFactory.treeFlipper = function(fbfriends){
         var countries = [];
         fbfriends.forEach(function(fbfriend){
             if(fbfriend.feed != undefined){
                 fbfriend.feed.data.forEach(function(post){
                     if(post.place !=undefined){
                         if(post.place.location != undefined){
                                var country;
                                var found = -1;
                                for(n =0; n<countries.length; n++){
                                    var check = countries[n].name;
                                    if(check == post.place.location.country){
                                        found = n;
                                    }
                                }
                                if(found>=0){
                                    country = countries[found];
                                }
                                else{
                                    country = {}
                                    country.name = post.place.location.country;
                                    country.places = [];
                                    countries.push(country);
                                }
                                
                                var place;
                                found = -1;
                                for(n=0; n<country.places.length; n++){
                                    var check = country.places[n].id;
                                    if(check == post.place.id){
                                        found = n;
                                    }
                                }
                                if(found>=0){
                                    place = country.places[found];
                                }else{
                                    place = {};
                                    place.id = post.place.id;
                                    place.name = post.place.name;
                                    place.friends = [];                              
                                    country.places.push(place); 
                                }
                                console.log(place);
                                var friend;
                                found = -1;
                                for(n=0; n<place.friends.length; n++){
                                    var check = place.friends[n].id;
                                    if(check == fbfriend.id){
                                        found = n;
                                    }
                                }
                                if(found>=0){
                                    friend = place.friends[found];
                                }else{
                                	friend = {};
                                    friend.name = fbfriend.name;
                                    friend.id = fbfriend.id;
                                    friend.source = fbfriend.picture.data.url;
                                    friend.posts = [];
                                    place.friends.push(friend);
                                }
                                
                                console.log(friend);
                           
                                var pst = {}
                                pst.id = post.id;
                                pst.time = post.created_time;
                                if (post.story != undefined)
                                    pst.story = post.story;
                                if (post.message != undefined)
                                    pst.message = post.message;
                                if(post.full_picture != undefined)
                                    pst.src = post.full_picture;
                                friend.posts.push(pst); 
                         }
                     }
                 });
             }
         });
         var pretty = JSON.stringify(countries, null, "\t") ;
         //document.getElementById("dataDiv").appendChild(document.createTextNode(pretty));
       console.log(countries);
       return countries;
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

	FacebookFactory.getCountries = function(){
		var deferred = $q.defer();
		var query = 'me/friends?fields=id,name,picture.type(large),feed.limit(1000).since(2016-08-01T00:00:00){id,created_time,place{id, name, location{country}},story,message,full_picture}';
		FB.api(query, function(response){
			var countries = FacebookFactory.treeFlipper(response.data);
			deferred.resolve({countries: countries});
		});
		return deferred.promise;
	};

	FacbookFactory.generateJourney = function(){
		var deferred = $q.defer();
		var query ='me/feed?fields=id,created_time,story,message,likes.limit(0).summary(true),place,full_picture&since=';
		query+=getLastYear();
		FB.api(query, function(response) {
			var currCountry ="";
			var journeys = [];
			var journeyCount = -1;
			var posts = response.data;
			for(i =0; i<posts.length; i++){
				var qPost = posts[i]
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
							newJourney.country = qCountry;
							newJourney.posts = [];
							returnObj.push(newJourney);
						}else{
							
						}
						var newPost = {};
						newPost.id = qPost.id;
						newPost.time = qPost.created_time;
						newPost.story = qPost.story;
						newPost.message = qPost.message;
						if(qPost.full_picture!= undefined){
							newPost.src = qPost.full_picture;
						}
						newPost.likes = qPost.likes.summary.total_count;
						newPost.country = qCountry;
						newJourney.posts.push(newPost);
					}
				}
			}
			deferred.resolve({journeys: journeys});
		});
		
		return deferred.promise;
	}
	function getLastYear(){
		var lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
		var returnVal = lastYear.getFullYear()+"-"+lastYear.getMonth()+"-"+lastYear.getDate()+"T00:00:00";
		//alert(returnVal);
		return returnVal;
	}
	  // This function is called when someone finishes with the Login
	  // Button.  See the onlogin handler attached to it in the sample
	  // code below.
	  function checkLoginState() {
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

