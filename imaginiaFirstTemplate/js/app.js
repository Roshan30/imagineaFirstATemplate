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




 module.service('$commonService', function() {
 	var imageId;
 	var imageTitle;
 	var imageSrc;
 	var imageVenue;
 	var imageDnT;
 	var imageDesc;
 	return {
 		getImageId: function() {
 			return imageId;
 		},
 		setImageId: function(value) {
 			imageId = value;
 		},
 		getImageTitle: function() {
 			return imageTitle;
 		},
 		setImageTitle: function(value) {
 			imageTitle = value;
 		},
 		getImageSrc: function() {
 			return imageSrc;
 		},
 		setImageSrc: function(value) {
 			imageSrc = value;
 		},
 		getImageVenue: function() {
 			return imageVenue;
 		},
 		setImageVenue: function(value) {
 			imageVenue = value;
 		},
 		getImageDnT: function() {
 			return imageDnT;
 		},
 		setImageDnT: function(value) {
 			imageDnT = value;
 		},
 		getImageDesc: function() {
 			return imageDesc;
 		},
 		setImageDesc: function(value) {
 			imageDesc = value;
 		}
 	};
 });


 module.controller("RouteController", function($scope, $http, $commonService) {
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
 	$scope.passEventDetails = function(imageId, imageTitle, imageSrc, imageVenue, imageDnT, imageDesc) {
 		//alert('pass '+imageId+imageTitle+imageSrc+imageVenue+imageDnT+imageDesc);
 		$commonService.setImageId(imageId);
 		$commonService.setImageTitle(imageTitle);
 		$commonService.setImageSrc(imageSrc);
 		$commonService.setImageVenue(imageVenue);
 		$commonService.setImageDnT(imageDnT);
 		$commonService.setImageDesc(imageDesc);
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
 module.controller("eventDetailCtrl", function($scope, $commonService, $routeParams) {

 	$scope.imageId = $commonService.getImageId();
 	$scope.imageTitle = $commonService.getImageTitle();
 	$scope.imageSrc = $commonService.getImageSrc();
 	$scope.imageVenue = $commonService.getImageVenue();
 	$scope.imageDnT = $commonService.getImageDnT();
 	$scope.imageDesc = $commonService.getImageDesc();

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
