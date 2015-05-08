'use strict';

angular.module('zilo')
.factory('Listing', function($http, nodeUrl){

  function Listing(obj){
    this.street = obj.street;
    this.city = obj.city;
    this.state = obj.state;
    this.zip = obj.zip;
    this.photo = obj.photo;
    this.price = obj.price;
    this.beds = obj.beds;
    this.baths = obj.baths;
    this.sqft = obj.sqft;
    // this.departure = obj.departure;
  }

  Listing.show = function(listingId){
    return $http.get(nodeUrl + '/listings/' + listingId);
  };

  Listing.prototype.save = function(){
    return $http.post(nodeUrl + '/listings', this);
  };

  Listing.destroy = function(listing){
    return $http.delete(nodeUrl + '/listings/' + listing._id);
  };

  Listing.edit = function(listing, listingId){
    return $http.put(nodeUrl + '/listings/' + listingId, listing);
  };

  return Listing;
});
