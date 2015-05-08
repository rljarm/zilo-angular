'use strict';

angular.module('zilo')
.factory('Area', function($http, nodeUrl){

  function Area(obj){
    this.addrString = obj.addrString;
    this.lat = obj.lat;
    this.lng = obj.lng;
    this.photo = obj.photo;
    this.price = obj.price;
    this.beds = obj.beds;
    this.baths = obj.baths;
    this.sqft = obj.sqft;
    this.zip = obj.zip;
    this.city = obj.city;
  }


  Area.prototype.save = function(){
    console.log('inside Area prototype save fx');
    return $http.post(nodeUrl + '/listings', this);
  };

  Area.find = function(){
    return $http.get(nodeUrl + '/listings');
  };

  Area.findByCity = function(city){
    return $http.get(nodeUrl + '/listings/city/' + city);
  };

  Area.findByZip = function(zip){
    return $http.get(nodeUrl + '/listings/zip/' + zip);
  };

  return Area;
});
