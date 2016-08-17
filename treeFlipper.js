// Sample of data from FB
var friends = [
  {
  	"id": "10152133191021033",
    "name": "Xu Duangui",
    "feed": {
    	"data": [
  	    {
          "id": "10152133191021033_10153790322166033",
          "created_time": "2016-07-22T08:18:31+0000",
          "place": {
            "id": "171864332847346",
            "name": "HDB Hub",
            "location": {
              "country": "Singapore"
            }
          },
          "story": "Xu Duangui with Deborah Tan at HDB Hub.",
          "message": "WE COLLECTED OUR KEYS! 拿锁匙咯！One of our most expensive and exciting purchase! Congratulations to US! 🔑"
        },
        {
         	"id": "10152133191021033_10153776722911033",
          "created_time": "2016-07-16T09:21:35+0000",
          "place": {
            "id": "237935329636469",
            "name": "Kallang Practice Park",
            "location": {
              "country": "Singapore"
            }
          },
          "story": "Xu Duangui with Deborah Tan at Kallang Practice Park.",
          "message": "Saturdate with my favourite date! #ndp #duanxdeb  😍😍😍"
        }
      ]
    }
	},
	{
		"id": "10152624344014039",
    "name": "Barry Weinberg",
    "feed": {
      "data": [		
	    	{
		      "id": "10152624344014039_10154016423939039",
		      "created_time": "2016-07-25T01:55:42+0000",
		      "place": {
		        "id": "198396155486",
		        "name": "Loews Philadelphia Hotel",
		        "location": {
		          "country": "United States"
		        }
		      },
		      "story": "Barry Weinberg added 4 new photos — with Aries Dela Cruz at Loews Philadelphia Hotel.",
		      "message": "This donkey represents New York City's enduring reminder of America's promise to immigrants. The donkeys installed as art installations all over the city represent the delegations that have gathered here in Philadelphia, a historic city where American democracy was established, to highlight our party's platform and vision to the people of this country and who our pick for presidential nominee will officially be. Democrats know that we are stronger together as a country and we resoundingly reject those who want to divide us. I'm so proud to have been here today with everyone from officials to grassroots activists, who have put in time and effort to make this convention and campaign happen, and I can't wait until we officially kick off our efforts to do everything we can to stop Donald Trump and his party in November and to elect our nominees for president and Vice President, Hillary Clinton and U.S. Senator Tim Kaine . #DemsInPhilly #DNCinPHL #ImWithHer"
		    }
		  ]
		}
	}
];


// The following code is for Tenzy to use
function treeFlipper(arrayOfFriends){
	var countries = {};
	friends.forEach(function(friend){
		friend.feed.data.forEach(function(post){
			var country = post.place.location.country;
			var place = post.place;
			if(!countries[country]){
				countries[country] = {};
				countries[country][place.id] = {name: place.name, id: place.id};
				countries[country][place.id][friend.id] = friend;
			}else if(!countries[country][place.id]){
				countries[country][place.id] = {name: place.name, id: place.id};
				countries[country][place.id][friend.id] = friend;
			}else if(!countries[country][place.id][friend.id]){
				countries[country][place.id][friend.id] = friend;
			}
		});
	});
	console.log(countries);
	return countries;
}

// Invoking the function!
treeFlipper(friends);

