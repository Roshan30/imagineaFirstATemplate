angular.module("sampleApp", []).

factory('commonService'function($q, $http){
	var jsonData;
	var defer = $q.defer();
		function _getEvents (){
			return defer.promise();
		}
	return{
		getEvents:_getEvents()
	}
});