'use strict';

app.controller('JourneyCreateCtrl', function($scope, $rootScope, $state, $stateParams, DatabaseFactory, FacebookFactory, PixabayFactory) {
    // Defaults
    $scope.defaultPostPic = '/images/landing-feature2.jpg';

    // Display params
    $scope.todayDate = new Date();
    $scope.countries = [];

    // Post data
    $scope.posts = [{country: 'China'}, {country: 'Malaysia'},{country: 'Malaysia'},{country: 'England'}, {country: 'Russia'},{country: 'Malaysia'},{country: 'Malaysia'}]; // <-- Ten will provide some async function here
    $scope.selectedPosts = [];

    // Journey params
    $scope.journeyName = "Singapore";
    $scope.journeyCoverCountry;

    // Functions
    $scope.updateJourneyName = function(name){
        $scope.journeyName = name;
    }

    $scope.getJourneyCoverPhoto = function() {
        PixabayFactory.getCountryImgUrl($scope.journeyCoverCountry)
        .then(function(url){
            $scope.journeyCoverPhoto = url;
        });
    }

    $scope.createJourney = function(){
        // Michelle: You can call createJourney, but you have to make sure to pass the correct journeyName, journeySource, and selectedPosts (an array of posts the user wants)
        DatabaseFactory.createJourney($rootScope.userId, $scope.journeyName, $scope.selectedPosts, $scope.journeyCoverPhoto);
    }

    $scope.getAllCountriesFromPosts = function() {
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

    $scope.getSelectedCountryNames = function() {
        var selectedCountries = [];

        $scope.countries.map(function(country) {
            if (country.selected) {
                selectedCountries.push(country.name);
            }
        });

        return selectedCountries;
    }
});
