'use strict';

app.config(function($stateProvider){
  $stateProvider.state('landing', {
      url: '/',
      templateUrl: '/browser/landing/landing.html',
      controller: 'LandingCtrl'
  });

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/browser/home/home.html',
    controller: 'HomeCtrl',
    resolve: {
      $title: function() { return 'Home'; }
    }
  });

  $stateProvider.state('profile', {
    url: '/profile/:id',
    templateUrl: '/browser/profile/profile.html',
    controller: 'ProfileCtrl',
    resolve: {
      $title: function() { return 'Profile'; }
    }
  });

  $stateProvider.state('friends', {
    url: '/friends',
    templateUrl: '/browser/friends/friends.html',
    controller: 'FriendsCtrl',
    resolve: {
      $title: function() { return 'Friends'; }
    }
  });

  $stateProvider.state('journeys', {
    url: '/journeys',
    templateUrl: '/browser/journeys/journeys.html',
    controller: 'JourneysCtrl',
    resolve: {
      $title: function() { return 'Journeys'; }
    }
  });

  $stateProvider.state('policy', {
    url: '/policy',
    templateUrl: '/browser/policy/policy.html',
    resolve: {
      $title: function() { return 'Privacy Policy'; }
    }
  });

  $stateProvider.state('terms', {
    url: '/terms',
    templateUrl: '/browser/terms/terms.html',
    resolve: {
      $title: function() { return 'Terms of Service'; }
    }
  });

  $stateProvider.state('credits', {
    url: '/credits',
    templateUrl: '/browser/credits/credits.html',
    resolve: {
      $title: function() { return 'Credits'; }
    }
  });


});
