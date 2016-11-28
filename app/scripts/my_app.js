'use strict';

angular.module('confusionApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
      // home page
          .state('app', {
            url: '/',
            views: {
              'header': {
                templateUrl: 'views/header.html'
              },
              'content': {
                template: '<h1>To be completed<\h1>',
                controller: 'IndexController'
              },
              'footer': {
                templateUrl: 'views/footer.html'
              }
            }
          })
          // about us page
          .state('app.aboutus', {
            url: 'aboutus',
            views: {
              'content@': {
                template: '',
                controller: 'AboutController'
              }
            }
          })
          // contact us page
          .state('app.contactus', {
            url: 'contactus',
            views: {
              'content@': {
                templateUrl: 'views/contactus.html',
                controller: 'ContactController'
              }
            }
          })
          // menu page
          .state('app.menu', {
            url: 'menu',
            views: {
              'content@': {
                templateUrl: 'views/menu.html',
                controller: 'MenuController'
              }
            }
          })
          // dishdetail page
          .state('app.dishdetail', {
            url: 'menu/:id',
            views: {
              'content@': {
                templateUrl: 'views/dishdetail.html',
                controller: 'DishDetailController'
              }
            }
          });
      $urlRouterProvider.otherwise('/');
    })
;
