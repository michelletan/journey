'use strict';

app.controller('JourneyCreateCtrl', function($scope, $rootScope, $state, $stateParams, DatabaseFactory, FacebookFactory, PixabayFactory) {
    if ($stateParams.journeyId) {
        // If journey with id cannot be found, redirect

        // Else, load journey data
        // $scope.journey = journey;

        // Get date range for the posts of the journey
        var range = getDateRangeFromPosts($scope.journey.posts);
        $scope.startDate = range.min;
        $scope.endDate = range.max;

        // Retrieve all posts with this range -- done on UI side or here?

        // $scope.posts = retrievedPosts;

        // Further init done below

    } else {
        $scope.posts = [{country: 'China'}, {country: 'Malaysia'},{country: 'Malaysia'},{country: 'England'}, {country: 'Russia'},{country: 'Malaysia'},{country: 'Malaysia'}]; // <-- Ten will provide some async function here
        
        selectAllPosts();
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

    // Assign functions to scope
    $scope.updateJourneyName = updateJourneyName;
    $scope.getJourneyCoverPhoto = getJourneyCoverPhoto;
    $scope.createJourney = createJourney;
    $scope.selectAllPosts = selectAllPosts;
    $scope.getAllCountriesFromPosts = getAllCountriesFromPosts;
    $scope.getSelectedCountryNames = getSelectedCountryNames;
    $scope.updatePostStatus = updatePostStatus;

    // Init actions
    $scope.$watch('posts', $scope.updatePostStatus, true);
    init();

    // Public functions
    function init() {
        getAllCountriesFromPosts();
        getJourneyCoverPhoto();
        getSelectedPostCount();
    }

    function updateJourneyName(name) {
        $scope.journeyName = name;
    }

    function getJourneyCoverPhoto() {
        PixabayFactory.getCountryImgUrl($scope.journeyCoverCountry)
        .then(function(url){
            $scope.journeyCoverPhoto = url;
        });
    }

    function createJourney() {
        // Michelle: You can call createJourney, but you have to make sure to pass the correct journeyName, journeySource, and selectedPosts (an array of posts the user wants)
        DatabaseFactory.createJourney($rootScope.userId, $scope.journeyName, $scope.selectedPosts, $scope.journeyCoverPhoto);
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
});
