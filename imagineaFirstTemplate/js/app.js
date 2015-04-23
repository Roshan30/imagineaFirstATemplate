var module = angular.module("sampleApp", ['ngRoute']);

 module.config(['$routeProvider',
 	function($routeProvider) {
 		$routeProvider.
 		when('/homePage', {
 			templateUrl: 'templates/homePage.html'
 		}).
 		when('/eventDetail/:title', {
 			templateUrl: 'templates/eventDetail.html',
 			controller: 'eventDetailCtrl'
 		}).
 		when('/addEvent', {
 			templateUrl: 'templates/addEvent.html',
 			controller: 'addEventCtrl'
 		}).
 		otherwise({
 			redirectTo: '/homePage'
 		});
 	}
 ]);
 

