'use strict';

angular.module('confusionApp')
    .constant('baseUrl', 'http://localhost:3000/')
    .service('menuFactory', ['$http', 'baseUrl', function($http, baseUrl) {

      this.getDishes = function() {
        return $http.get(baseUrl + 'dishes');
      };

      this.getDish = function(index) {
        return $http.get(baseUrl + 'dishees/' + index);
      };

      this.getPromotion = function(index) {
        return $http.get(baseUrl + 'promotions/' + index);
      }

    }])

    .factory('corporateFactory',['$http', 'baseUrl', function($http, baseUrl) {

      var corpfac = {};

      corpfac.getLeaders = function() {
        return $http.get(baseUrl + 'leadership');
      };

      corpfac.getLeader = function(index) {
        return $http.get(baseUrl + 'leadership/' + index);
      };

      return corpfac;
    }])

;
