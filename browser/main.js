'use strict';

var app = angular.module('journeyApp', ['ui.router', 'ngMaterial', 'mwl.bluebird']);

// Start up Facebook API
FB.init({
  appId      : '327010674354140',
  cookie     : true,  // enable cookies to allow the server to access
                    // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.7' // use graph api version 2.7
});

app.config(function ($urlRouterProvider) {
  $urlRouterProvider.when('','/');
});
