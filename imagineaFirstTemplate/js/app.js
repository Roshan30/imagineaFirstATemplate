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
 module.controller("RouteController", function($scope, $http,$location) {
 	$http.get("data/imagePath.json").success(function(response) {
 		$scope.imagePaths = response;
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

 	
 		$http.get("data/imagePath.json").success(function(response) {
 				console.log(response);
 		$.each(response, function (key, data) { 	
 		//console.log(data.id+' '+$routeParams.title)				
 					if(data.id==$routeParams.title){
 							
 						$scope.selectedObjet=data;
 						console.log($scope.selectedObjet);
 					}
 			});
 	});

 });
 module.controller("addEventCtrl", function($scope,$http) {
 		$scope.models={
 			event:{
 				icon:'css/images/img5.png'
 			}
 		}

 		$scope.randomString = function() {
    		charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   	 		var randomString = '';
    		for (var i = 0; i < 10; i++) {
    		var randomPoz = Math.floor(Math.random() * charSet.length);
    		randomString += charSet.substring(randomPoz,randomPoz+1);
   	 		}
   	 		$http.get("data/imagePath.json").success(function(response) {
 			$.each(response, function (key, data) { 	
 					if (randomString == data.id) {
 						$scope.randomString();
 					}
 			});
    		});
			
			return randomString;
		}	


		$scope.saveEvent = function (){
			$scope.genratedIdNew = $scope.randomString();
			$scope.models.event.id = $scope.genratedIdNew;
				
						$http.get("data/imagePath.json").success(function(response) {
 						response.push($scope.models.event);
 						console.log(response);
    		});

 					 }
    		


		

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
