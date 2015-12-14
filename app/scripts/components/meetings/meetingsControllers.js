angular.module('CouncilsMobile')
  .controller('MeetingController', ['$scope','Meeting','$routeParams','$interval',
      function($scope,Meeting,$routeParams,$interval) {
          $scope.meeting = Meeting.$find($routeParams.id);
          $scope.users = $scope.meeting.users.$fetch();

          var intervalPromise = $interval(function(){$scope.users.$refresh(); },2000);
          $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
      }
  ])
  .controller('MeetingIndexController', ['$scope','Meeting', function($scope,Meeting) {
      $scope.meetings = Meeting.$search();

      $scope.createMeeting = function(){
          $scope.meetings.$create();
      };

      $scope.destroyMeeting = function(meeting){
          meeting.$destroy();
      };
  }]);
