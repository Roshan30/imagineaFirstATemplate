angular.module("sampleApp")
.controller("RouteController", function($scope, $location,commonService,$commonService,$window) {
 

    if(flag.firstTimeEvents){
        commonService.getEvents().then(function(events){
      $scope.imagePaths = events;
      $commonService.setEvents(events);
    });
        flag.firstTimeEvents = false;
    }else{
        $scope.imagePaths = $commonService.getEvents();
    }
    

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
 $scope.$watch( function () {
        return $window.searchFieldValGlobal; 
    }, function (newVal, oldVal) {
  $scope.searchFieldValGlobal = newVal;
 });

 })

 .controller("headerCtrl", function($scope, commonService,$commonService) {
 	commonService.getePath().then(function(response){
          $scope.paths = response;
      });
      $scope.searchFieldVal={}
      $scope.updateSearch = function(fieldVal){
       searchFieldValGlobal = $scope.searchFieldVal.newVal;
      }
            
 })

.controller("sideMenuCtrl", function($scope, commonService) {
 			commonService.getPath().then(function(response){
          $scope.paths = response;
      });

 })
.controller("eventDetailCtrl", function($scope, $routeParams, $commonService) {

    $scope.response = $commonService.getEvents();

 		$.each($scope.response, function (key, data) { 	
 					if(data.id==$routeParams.title){
 						$scope.selectedObjet=data;
 					}
 			});
 	

 })
.controller("addEventCtrl", function($scope,commonService,$location) {
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
   	 		commonService.getEvents().then(function(response){
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
         	 jsonData.push($scope.models.event);
          
           safeApply($scope, function() {
            $location.path('#/homePage');
            });
          
 					 }
 });