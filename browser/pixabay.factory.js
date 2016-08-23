app.factory('PixabayFactory', function($q, $http){
	
	var PixabayFactory = {}
	var API_KEY = '3129951-64f23563232747f3a8f3bb9b9';
	var BASE_URL = "https://pixabay.com/api/?key="+API_KEY+"&q=";

	PixabayFactory.getCountryImgUrl = function(country){

		var deferred = $q.defer();

		var URL = BASE_URL+country;
		URL = URL + "&min_height=&orientation=horizontal&image_type=photo&cat=buildings&min_width=&order=popular&per_page=3";

		success = URL;

		$http.get(URL).then(function(response){
			if(response.data.hits.length>0){
				deferred.resolve(response.data.hits[0].webformatURL);
				//console.log(response.data.hits[0].webformatURL);

			}else{
				deferred.reject('PIXABAY SEARCH ERROR: no hits for the country'+country);
				//console.log('PIXABAY SEARCH ERROR: no hits for the country'+country);
			}
		});
		return deferred.promise;
	}


	return PixabayFactory;
});