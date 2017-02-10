'use strict';

//const {ipcRenderer} = nodeRequire('electron');
//console.log(ipcRenderer);
//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
//
//ipcRenderer.on('asynchronous-reply', (event, arg) => {
//  console.log(arg); // prints "pong"
//});
//ipcRenderer.send('asynchronous-message', 'ping');

//var e = nodeRequire('electron');
//console.log(e);
//console.log(e.app);

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);