'use strict';

angular.module('zilo')
.controller('ListingsListCtrl', function($scope, $window, Area, Map, $state){
  var map;
  $scope.zips = [];
  $scope.cities = [];
  var markers = [];
  getListings();

  function getListings(){
    Area.find()
    .then(function(response){
      $scope.listings = response.data.listings;
      $scope.centerLat = getMeanLat($scope.listings);
      $scope.centerLng = getMeanLng($scope.listings);
      map = Map.create('#listingMap', $scope.centerLat.toFixed(4), $scope.centerLng.toFixed(4), 7);
      addMarkers();
      getZips($scope.listings);
      getCities($scope.listings);
      console.log('$scope.zips: ', $scope.zips);
      console.log('$scope.cities: ', $scope.cities);
    });
  }

  $scope.show = function(listing){
    $state.go('listings.show', {listingId: listing._id});
  };

  $scope.filterByCity = function(selectedCity){
    Area.findByCity(selectedCity)
    .then(function(response){
      $scope.listings = response.data.listings;
      $scope.centerLat = getMeanLat($scope.listings);
      $scope.centerLng = getMeanLng($scope.listings);
      map = Map.create('#listingMap', $scope.centerLat.toFixed(4), $scope.centerLng.toFixed(4), 7);
      addMarkers();
    });
  };

  $scope.filterByZip = function(selectedZip){
    Area.findByZip(selectedZip)
    .then(function(response){
      $scope.listings = response.data.listings;
      $scope.centerLat = getMeanLat($scope.listings);
      $scope.centerLng = getMeanLng($scope.listings);
      map = Map.create('#listingMap', $scope.centerLat.toFixed(4), $scope.centerLng.toFixed(4), 7);
      addMarkers();
    });
  };

  function addMarkers(){
    // clearMarkers();
    markers = $scope.listings.map(function(s){
      s.marker = Map.addMarker(map, s.lat, s.lng, s.name, '/assets/house.png');
    });
  }

  function clearMarkers(){
    markers.forEach(function(m){
      m.setMap(null);
    });
    markers = [];
  }

  function getMeanLat(listings){
    return listings.reduce(function(prev, curr){
      return prev + curr.lat;
    }, 0)/ listings.length;
  }

  function getMeanLng(listings){
    return (listings.reduce(function(prev, curr){
      return prev + curr.lng;
    }, 0)/ listings.length);
  }

  function getZips(listings){
    listings.forEach(function(listing){
      if ($scope.zips.indexOf(listing.zip)){
        $scope.zips.push(listing.zip);
      }
    });
  }

  function getCities(listings){
    listings.forEach(function(listing){
      if ($scope.cities.indexOf(listing.city)){
        $scope.cities.push(listing.city);
      }
    });
  }


  $scope.toggleBounce = function (listing) {
    if (listing.marker.getAnimation() !== null) {
      listing.marker.setAnimation(null);
    } else {
      listing.marker.setAnimation($window.google.maps.Animation.BOUNCE);
    }
  };
  //
  // $scope.destroy = function(obj){
  //   var area = new Area(obj);
  //   area.destroy()
  //   .then(function(response){
  //     $window._.remove($scope.areas, function(t){
  //       return t._id === response.data._id;
  //     });
  //   });
  // };
});
