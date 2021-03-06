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
    controller: 'HomeCtrl'
  });

  $stateProvider.state('profile', {
    url: '/profile/:userId',
    templateUrl: '/browser/profile/profile.html',
    controller: 'ProfileCtrl'
  });

  $stateProvider.state('friends', {
    url: '/friends',
    templateUrl: '/browser/friends/friends.html',
    controller: 'FriendsCtrl'
  });

  $stateProvider.state('journey', {
    url: '/profile/:userId/journey/:journeyId',  
    templateUrl: '/browser/journey/journey.html',
    controller: 'JourneyCtrl'
  });

  $stateProvider.state('create', {
    url: '/create',
    params: {userId: null},
    templateUrl: '/browser/journey-create/journey-create.html',
    controller: 'JourneyCreateCtrl'
  });

  $stateProvider.state('edit', {
    url: '/edit/:journeyId',
    templateUrl: '/browser/journey-create/journey-create.html',
    controller: 'JourneyCreateCtrl'
  });

  $stateProvider.state('policy', {
    url: '/policy',
    templateUrl: '/browser/policy/policy.html'
  });

  $stateProvider.state('terms', {
    url: '/terms',
    templateUrl: '/browser/terms/terms.html'
  });

  $stateProvider.state('credits', {
    url: '/credits',
    templateUrl: '/browser/credits/credits.html'
  });


});
