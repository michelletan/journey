'use strict';

app.filter('searchFriends', function() {
    return function(friends, query) {
        if (!query) {
            return friends;
        }

        var results = [];

        friends.map(function(friend) {
            if (friend.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                results.push(friend);
            }
        });

        return results;
    };
});
