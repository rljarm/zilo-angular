'use strict';

angular.module('zilo')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('listings.list');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/listings/listings-list.html', controller: 'ListingsListCtrl'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  // .state('profile', {url: '/profile', templateUrl: '/views/users/profile.html', controller: 'ProfileCtrl'})
  .state('listings', {url: '/listings', templateUrl: '/views/listings/listings.html', abstract: true})
  .state('listings.new', {url: '/new', templateUrl: '/views/listings/listings-new.html', controller: 'ListingsNewCtrl'})
  .state('listings.list', {url: '/', templateUrl: '/views/listings/listings-list.html', controller: 'ListingsListCtrl'})
  .state('listings.show', {url: '/{listingId}', templateUrl: '/views/listings/listings-show.html', controller: 'ListingsShowCtrl'})
  .state('listings.edit', {url: '/edit/{listingId}', templateUrl: '/views/listings/listings-new.html', controller: 'ListingsNewCtrl'});
});
