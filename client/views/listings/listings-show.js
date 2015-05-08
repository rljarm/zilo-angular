/* jshint camelcase: false */

'use strict';

angular.module('zilo')
.controller('ListingsShowCtrl', function($scope, $state, $window, Listing, Map){
  var listingId = $state.params.listingId;
  var map;
  Listing.show(listingId)
  .then(function(response){
    $scope.listing = response.data.listing[0];
    map = Map.create('#showPageMap', $scope.listing.lat, $scope.listing.lng, 15);
    addMarkers($scope.listing);
    console.log('$scope.listing: ', $scope.listing);
  });

  function addMarkers(s){
    Map.addMarker(map, s.lat, s.lng, s.name, '/assets/house.png');
  }

  $scope.destroy = function(listing){
    Listing.destroy(listing)
    .then(function(){
      $state.go('listings.list');
    });
  };

  $scope.edit = function(listing){
    $state.go('listings.edit', {listingId: listing._id});
  };
});
