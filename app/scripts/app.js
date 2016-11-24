'use strict';

angular.module('confusionApp', ['ngRoute'])
    .config(function($routeProvider) {
      $routeProvider
          .when('/contactus', {//route for contactus page
            templateUrl: 'contactus.html',
            controller: 'ContactController'
          })
          .when('/menu', {//route for menu page
            templateUrl: 'menu.html',
            controller: 'MenuController'
          })
          .when('/menu/:id', {//route for dish details page
            templateUrl: 'dishdetail.html',
            controller: 'DishDetailController'
          })
          .otherwise('/contactus')
    })
;
