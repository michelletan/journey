'use strict';

app.controller('JourneyCreateCtrl', function($scope, $rootScope, $state, $stateParams, DatabaseFactory, FacebookFactory, PixabayFactory) {
    // Redirect users if they haven't logged in
    FB.getLoginStatus(function(response) {
        FacebookFactory.statusChangeCallback(response)
        .then(function(userObj){
                if(!userObj.id) return;
            $scope.userName = userObj.name;
            $scope.userSource = userObj.source;
            $scope.userId = userObj.id;
        })
    });

    $scope.journey = {name: 'Amazing Trip'};
    $scope.endDate = new Date();
    $scope.startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    FacebookFactory.getPosts($scope.startDate, $scope.endDate)
    .then(function(posts){
        $scope.posts = posts;        
        console.log("Create Journey posts are: ", posts);
        return $scope.posts;
    })
    .then(function(posts){

        // Subsequent $scope defns and functions are chained AFTER $scope.posts have been defined 
        $scope.done = done;
        $scope.updateJourneyName = updateJourneyName;
        $scope.getJourneyCoverPhoto = getJourneyCoverPhoto;
        $scope.selectAllPosts = selectAllPosts;
        $scope.getAllCountriesFromPosts = getAllCountriesFromPosts;
        $scope.getSelectedCountryNames = getSelectedCountryNames;
        $scope.updatePostStatus = updatePostStatus;
        
        // Init actions
        $scope.$watch('posts', $scope.updatePostStatus, true);
        init();



        // Public functions
        // Michelle I followed your style -YH
        function done(){
            $scope.posts = $scope.posts.filter(function(post){
                return post.isSelected;
            })
            DatabaseFactory.createJourney($stateParams.userId, $scope.journeyName, $scope.posts, $scope.journeyCoverCountry)
            .then(function(){
                $state.go('home');
            })
        }


        function init() {
            selectAllPosts();
            getAllCountriesFromPosts();
            getJourneyCoverPhoto();
            getSelectedPostCount();
        }
    

        // Defaults
        $scope.defaultPostPic = '/images/landing-feature2.jpg';

        // Display params
        $scope.todayDate = new Date();
        $scope.countries = [];
        $scope.selectedPostCount = 0;

        // Post data
        $scope.selectedPosts = [];

        // Journey params
        $scope.journeyName = "";
        $scope.journeyCoverCountry;


        function updateJourneyName(name) {
            $scope.journeyName = name;
        }

        function getJourneyCoverPhoto() {
            PixabayFactory.getCountryImgUrl($scope.journeyCoverCountry)
            .then(function(url){
                $scope.journeyCoverPhoto = url;
            });
        }

        function selectAllPosts() {
            $scope.posts.map(function(post) {
                post.isSelected = true;
            });
        }

        function getAllCountriesFromPosts() {
            var countryNames = [];
            var countries = [];

            $scope.posts.map(function(post) {
                if (countryNames.indexOf(post.country) < 0) {
                    countryNames.push(post.country);
                    countries.push({name: post.country, selected: true});
                }
            });

            $scope.countries = countries;
            $scope.journeyCoverCountry = $scope.countries[0].name;
        }

        function getSelectedCountryNames() {
            var selectedCountries = [];

            $scope.countries.map(function(country) {
                if (country.selected) {
                    selectedCountries.push(country.name);
                }
            });

            return selectedCountries;
        }

        function updatePostStatus(post) {
            if (post) {
                post.isSelected = !post.isSelected;
            }
            $scope.selectedPostCount = getSelectedPostCount();
        }

        // Private functions
        function getSelectedPostCount() {
            return $scope.posts.reduce(function(count, post) {
                return count + (post.isSelected ? 1 : 0)
            }, 0);
        }

        function getDateRangeFromPosts(posts) {
            var minDate, maxDate;

            posts.map(function(post) {
                if (minDate === undefined || post.date.getTime() < minDate.getTime()) {
                    minDate = post.date;
                }

                if (maxDate === undefined || post.date.getTime() > maxDate.getTime()) {
                    maxDate = post.date;
                }
            });

            return {min: minDate, max: maxDate};
        }

    })

});
