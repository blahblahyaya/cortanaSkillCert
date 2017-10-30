'use strict';

angular.module("cortanaCert.certQueue", [
	'ui.bootstrap',
	'cortanaCert.date-filter',
	'cortanaCert.stage-filter'])
.controller('cortanaCertCtrl',['Restangular', '$scope', '$routeParams', '$http', function (Restangular, $scope, $routeParams, $http) {
	$scope.stage = $routeParams.stage;
	$scope.orderList = $routeParams.orderList;
	$scope.productGuid = $routeParams.productGuid;
	console.log($routeParams);
	if (typeof $scope.currentPage === 'undefined') {
		$scope.currentPage = 1;
	}
	$scope.pageSize = 500;

	if (typeof $scope.productGuid !== "undefined") {
		$http.get('http://localhost:3000/skills/?ProductGuid=' + $scope.productGuid).then(successCallback, errorCallback);
	} else if (typeof $scope.stage === 'undefined') {
		$http.get('http://localhost:3000/skills/').then(successCallback, errorCallback);
	} else {
		$http.get('http://localhost:3000/skills/?Stage=' + $scope.stage).then(successCallback, errorCallback);
	}

//    $scope.skillList = Restangular.all("skills").getList().$object;	
//	$http.get('json/AllTasks171025.json').then(successCallback, errorCallback);
	function successCallback(response){
	    $scope.skillList=response.data;
	}
	function errorCallback(err){
		console.log(err);
	}

}])