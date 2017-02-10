'use strict';

const {ipcRenderer} = nodeRequire('electron');
angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

    $scope.test = 'test';

    ipcRenderer.on('/api/machines', (event, arg) => {
      console.log('reply from main process', arg);

      $scope.$apply(function () {
          $scope.machines = arg;
      });
    });
    ipcRenderer.send('/api/machines');

//    $http.get('/api/machines').then(function(data) {
//        $scope.machines = data.data;
//    });

}]);