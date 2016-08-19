'use strict';

var app = angular.module('journeyApp', ['ui.router', 'ngMaterial']);

app.config(function ($urlRouterProvider) {
  $urlRouterProvider.when('','/');
});
