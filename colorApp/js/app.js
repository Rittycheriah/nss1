'use strict';

// Declare app level module which depends on filters, and services

var myApp = angular.module('myApp', ['ngRoute'])
myApp.config(function ($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'views/index.html',
      controller: 'colorController'
    }).
    when('/conditionsview', {
      templateUrl: 'views/conditionsview.html',
      controller: 'conditionsctrl'
    }).
    when('/todoHome',{
      templateUrl: 'views/tendayview.html',
      controller:'tendayctrl'
    }).
    when('/newTodo',{
      templateUrl: 'views/webcamsview.html',
      controller: 'webcamsctrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});