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
 		otherwise({
 			redirectTo: '/homePage'
 		});
 	}
 ]);
 module.controller("RouteController", function($scope, $http,$location) {
 	$http.get("data/path.json").success(function(response) {
 		$scope.imagePaths = response[0].imagePaths;
 	});
 	$scope.viewPageFunction = function(data) {
 		if(data == 'grid') {
 			$('.containerClass ul').removeClass('list').addClass('grid');
 		} else if(data == 'list') {
 			$('.containerClass ul').removeClass('grid').addClass('list');
 		}
 	}
 

 	$scope.navigateToDetails = function (paths) {
 		$location.url('eventDetail/' + paths.id);
 	}

 });

 module.controller("headerCtrl", function($scope, $http) {
 	$http.get("data/path.json")
 		.success(function(response) {
 			$scope.paths = response[0].epaths;
 		});

 });

 module.controller("sideMenuCtrl", function($scope, $http) {
 	$http.get("data/path.json")
 		.success(function(response) {
 			$scope.paths = response[0].paths;
 		});

 });
 module.controller("eventDetailCtrl", function($scope,$http, $routeParams) {

 	
 		$http.get("data/path.json").success(function(response) {
 		$.each(response[0].imagePaths, function (key, data) { 	
 		//console.log(data.id+' '+$routeParams.title)				
 					if(data.id==$routeParams.title){
 							
 						$scope.selectedObjet=data;
 						console.log($scope.selectedObjet);
 					}
 			});
 	});

 });


 safeApply = function($scope, fn) {
 	var phase = $scope.$root.$phase;
 	if(phase == '$apply' || phase == '$digest') {
 		if(fn && (typeof(fn) === 'function')) {
 			fn();
 		}
 	} else {
 		$scope.$apply(fn);
 	}
 };
