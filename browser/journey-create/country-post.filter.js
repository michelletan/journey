'use strict';

// Given a list of post objects, toggles the visible
// property for each post object, if the post object
// contains a country name from given list of country names.
app.filter('countryPost', function() {
	return function(posts, countryNames) {
		if (posts) {
			return posts.map(function(post) {
				post.isVisible = (countryNames.indexOf(post.country) > -1);
				post.isSelected = post.isSelected && post.isVisible;
				return post;
			});
		} else {
			return [];
		}
	};
});
