'use strict';

const {ipcRenderer} = nodeRequire('electron');

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });

}])

.controller('View1Ctrl', ['$scope', function($scope) {

    ipcRenderer.send('/api/machines');

    ipcRenderer.on('/api/machines', (event, arg) => {
        $scope.$apply(function () {
            console.log(arg);
            $scope.machines = arg;
        });
    });

    ipcRenderer.on('ping', (event, message) => {
        console.log(message);
    });

    $scope.quit = function() {
        ipcRenderer.send('/api/quit');
    };

    $scope.start = function(key) {
        ipcRenderer.send('/api/start', {
            key: key
        });
    };

//    $http.get('/api/machines').then(function(data) {
//        $scope.machines = data.data;
//    });
}]);