'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showDetails = false;

      $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
      };
      $scope.dishes = menuFactory.getDishes();

      $scope.select = function(setTab) {
        $scope.tab = setTab;
        if (setTab === 2) {
          $scope.filtText = "appetizer";
        } else if (setTab === 3) {
          $scope.filtText = "mains";
        } else if (setTab === 4) {
          $scope.filtText = "dessert";
        } else {
          $scope.filtText = "";
        }
      };

      $scope.isSelected = function(checkTab) {
        return ($scope.tab === checkTab);
      };
    }])
    .controller('ContactController', ['$scope', function($scope) {
      $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
      };
      $scope.channels = [{
        value: "tel",
        label: "Tel."
      }, {
        value: "Email",
        label: "Email"
      }];
      $scope.invalidChannelSelection = false;
    }])
    .controller('FeedbackController', ['$scope', function($scope) {
      $scope.sendFeedback = function() {
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
          $scope.invalidChannelSelection = true;
        } else {
          $scope.invalidChannelSelection = false;
          $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
          };
          $scope.feedback.mychannel = "";

          $scope.feedbackForm.$setPristine();
        }
      };
    }])
    .controller('DishDetailController', ['$scope', 'menuFactory', function($scope, menuFactory) {

      var dish = menuFactory.getDish(3);
      $scope.dish = dish;

    }])

    .controller('DishCommentController', ['$scope', function($scope) {

      $scope.comment = {
        author: '',
        rating: 5,
        comment: '',
        date: ''
      };

      $scope.submitComment = function() {

        $scope.comment.date = new Date().toISOString();
        $scope.dish.comments.push($scope.comment);
        $scope.commentForm.$setPristine();

        $scope.comment = {
          rating: 5
        };
      };
    }])
;
