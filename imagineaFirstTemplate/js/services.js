
var jsonData;
var flag = {
	 firstTimeEvents:true
}
var searchFieldValGlobal='';
angular.module("sampleApp").factory('commonService',function($q, $http){
	
	
		function _getEvents (){
			var defer = $q.defer();
				$http.get("data/imagePath.json").success(function(response) {
 				jsonData = response;
 				defer.resolve(jsonData);
 			});

			return defer.promise;
		}
		function _getPath (){
			var defer = $q.defer();
				$http.get("data/path.json").success(function(response) {
 				defer.resolve(response[0].paths);
 			});

			return defer.promise;
		}
		function _getePath (){
			var defer = $q.defer();
				$http.get("data/path.json").success(function(response) {
 				defer.resolve(response[0].epaths);
 			});

			return defer.promise;
		}
		var factory={}
		function _getSearchData (){
			console.log('factory'+searchFieldValGlobal);
			var defer = $q.defer();
			defer.resolve(searchFieldValGlobal);
			return defer.promise;
		}

	return{
		getEvents:_getEvents,
		getPath:_getPath,
		getePath:_getePath,
		getSearchData:_getSearchData
	}


}).service('$commonService', function () {
       var events;
       var searchData;
	  return {
            getEvents: function () {
                return events;
            },
            setEvents: function(value) {
                events = value;
            },
            getSearchData:function(){
            	return searchData;
            },
            setSearchData:function(data){
            	searchData = data;
            }
            }
        });






 safeApply = function($scope,fn) {
  var phase = $scope.$root.$$phase;
  if(phase == '$apply' || phase == '$digest') {
    if(fn && (typeof(fn) === 'function')) {
      fn();
    }
  } else {
    $scope.$apply(fn);
  }
};