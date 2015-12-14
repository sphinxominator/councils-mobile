angular.module('CouncilsMobile', [
  'ionic',
  'ngCordova',
  'ng-token-auth',
  'restmod'
])

.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])

.config(function(restmodProvider) {
    restmodProvider.rebase('AMSApi',{
        $config: {
            urlPrefix: 'http://councils.herokuapp.com/v1' //change this to your static ip
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/views/home.html',
            controller: 'MeetingIndexController'
        })
        .state('scan', {
            url: '/scan',
            templateUrl: 'templates/scan.html',
            controller: 'ScanController'
        });
    $urlRouterProvider.otherwise('/home');
})

/*.factory('Meeting', function(restmod) {
    return restmod.model('/meetings').mix({
      users: { hasMany: 'User'}
    });
})

.factory('User', function(restmod) {
    return restmod.model('/users').mix({
      meetings: { hasMany: 'Meeting'}
    });
})*/

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($authProvider) {
  var isMob = window.cordova !== undefined;
  $authProvider.configure({
    apiUrl: 'http://councils.herokuapp.com/v1',
    omniauthWindowType: isMob ? 'inAppBrowser' : 'newWindow',
    storage: 'localStorage'
  });
})

/*.controller('HomeController', ['$scope','Meeting', function($scope,Meeting) {
  $scope.meetings = Meeting.$search();

  $scope.createProject = function(){
    Meeting.save();
    $scope.meetings = Meeting.query();
  }
}])

.controller("ScanController",['$scope','$cordovaBarcodeScanner','$ionicPlatform','$http',
  function($scope, $cordovaBarcodeScanner,$ionicPlatform,$http) {
    $ionicPlatform.ready(function() {

      $cordovaBarcodeScanner.scan().then(function(imageData) {
        $http.post('http://councils.herokuapp.com/v1/attendances',{ secret: imageData.text })
          .then(function successCallback(response) {
            alert('Attendance logged!');
          }, function errorCallback(response) {
            alert('Error! Please try again.');
          });
      }, function(error) {
          console.log("An error happened -> " + error);
      });

    });
}])*/
