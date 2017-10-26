'use strict';

angular.module("cortanaCert.certQueue", [
	'ui.bootstrap',
	'cortanaCert.date-filter'])
.controller('cortanaCertCtrl',['$scope', '$http', function ($scope, $http) {
	if (typeof $scope.currentPage === 'undefined') {
		$scope.currentPage = 1;
	}
	$scope.pageSize = 7500;

// 	local $http.get('json/skills.json').success(function(data){
//	$http.get('http://www.mocky.io/v2/59e79d2e0f0000d607ee9ace').success(function(data){
	// get all skills
// 	$http.get('json/AllTasks.json').success(function(data){
	//json/AllTasks171025.json
	//json/AllTasksSample.json
$http.get('json/AllTasks171025.json').then(successCallback, errorCallback);

function successCallback(response){
    $scope.skillList=response.data;
}
function errorCallback(err){
	console.log(err);
}
//	$http.get('json/AllTasksSample.json').success(function(data){});
}])