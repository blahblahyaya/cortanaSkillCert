'use strict';

angular.module('cortanaCert.skill', ['ui.bootstrap', 'ngImageDimensions'])
	.controller('skillCtrl', ['$scope', '$filter', '$http', '$routeParams','$uibModal', function($scope, $filter, $http, $routeParams, $uibModal) {
		$scope.skillID = $routeParams.id;
		$scope.currentPage = $routeParams.currentPage;

		// pull in the skill based on Id:
		$http.get('json/AllTasks171025.json').then(skillSuccessCallback, errorCallback);
		function skillSuccessCallback(response){
			$scope.skill = $filter('filter')(response.data, {Id: parseInt($scope.skillID)}, true)[0];
		    $scope.skillList=response.data;
		}

		$scope.activityLog = [
			{
		    "Id": 1035648,
		    "UserID": 123,
		    "Status":"In Review",
		    "Date": "2017-09-23T18:25:43.511Z",
		    "Notes": "The note goes here."
		  	},
		  	{
		    "Id": 1035648,
		    "UserID": 123,
		    "Status":"Assigned",
		    "Date": "2017-09-23T17:25:43.511Z",
		    "Notes": "The other note is here."
		  	}
		];
/*
		// pull in the logs for this skill based on Id: 
		$http.get('json/ActivityLog.json').then(activitySuccessCallback, errorCallback);
		function activitySuccessCallback(response){
			$scope.activityLog = $filter('filter')(response.data, {Id: parseInt($scope.skillID)}, true);
		}
*/
		function errorCallback(err){
			console.log(err);
		}

	    $scope.approveSkill = function () {
	    	var $actDate = new Date();
	    	$scope.activityLog.push({Id: $scope.skill.Id, UserID: 123, Date: $actDate, Notes: "Open Approve", Status:"Approve Started"});
	        $uibModal.open({
	            templateUrl: 'skillApproveModal.html', // loads the template
	            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
	            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
	            controller: function($scope, $uibModalInstance, skill) {
	            	$scope.skill = skill;
		          $scope.ok = function(e) {
		            $uibModalInstance.close();
		            e.stopPropagation();
		          };
		          $scope.close = function(e) {
		          	//$uibModalInstance.dismiss();
		          	$uibModalInstance.close(false);
		          };
		        },
		        resolve: {
	                skill: function () {
	                    return $scope.skill;
	                }
	            }

	        });//end of modal.open
	    }; // end of approveSkill function

		$scope.rejectSkill = function() {
			    $uibModal.open({
	            templateUrl: 'skillRejectModal.html', // loads the template
	            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
	            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
	            controller: function($scope, $uibModalInstance, skill) {
	            	$scope.skill = skill;
	            	$scope.ok = function(e) {
		            $uibModalInstance.close();
		            e.stopPropagation();
		          };
		          $scope.close = function(e) {
		          	//$uibModalInstance.dismiss();
		          	$uibModalInstance.close(false);
		          };
		        },
		        resolve: {
	                skill: function () {
	                    return $scope.skill;
	                }
	            }

	        });//end of modal.open
		};

		$scope.assignCertifier = function() {
			alert("Assigned!");
		};

		$scope.unAssignCertifier = function() {
			alert("Unassigned");
		};

	}]);