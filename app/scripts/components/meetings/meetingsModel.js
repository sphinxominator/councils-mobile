angular.module('CouncilsMobile')
  .factory('Meeting', ['restmod',function(restmod) {
    return restmod.model('meetings').mix({
        users: { hasMany: 'User'}
    });
  }]);
