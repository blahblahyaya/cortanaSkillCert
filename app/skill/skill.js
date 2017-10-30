'use strict';

angular.module('cortanaCert.skill', ['ui.bootstrap', 'ngImageDimensions'])
	.controller('skillCtrl', ['$scope', '$filter', '$http', '$routeParams','$uibModal', 'Restangular', function($scope, $filter, $http, $routeParams, $uibModal, Restangular) {
		$scope.skillID = $routeParams.id;
		$scope.currentPage = $routeParams.currentPage;

		// pull in the skill based on id:
		//$http.get('json/AllTasks171025.json').then(skillSuccess2Callback, errorCallback);
		//function skill2SuccessCallback(response){
		//	$scope.skill = $filter('filter')(response.data, {Id: parseInt($scope.skillID)}, true)[0];
		//}
		$http.get('http://localhost:3000/skills/' + parseInt($scope.skillID)).then(skillSuccessCallback, errorCallback);
		function skillSuccessCallback(response){
			$scope.skill = response.data;
		}

		
		function errorCallback(err){
			console.log(err);
		}
		//$http.get('json/AllTasks171025.json').then(skillSuccessCallback, errorCallback);
		//$scope.skill2 = Restangular.one('skills', $scope.skillID).get();

		// get activity for this skill
		$http.get('http://localhost:3000/activity/?SkillId=' + parseInt($scope.skillID)).then(activitySuccessCallback, errorCallback);
		function activitySuccessCallback(response){
			$scope.activityLog = response.data;
		}


/*
		// pull in the logs for this skill based on Id: 
		$http.get('json/ActivityLog.json').then(activitySuccessCallback, errorCallback);
		function activitySuccessCallback(response){
			$scope.activityLog = $filter('filter')(response.data, {Id: parseInt($scope.skillID)}, true);
		}
*/


	    $scope.approveSkill = function () {
	    	var $actDate = new Date();
	    	//$scope.activityLog.push({Id: $scope.skill.Id, UserID: 123, Date: $actDate, Notes: "Open Approve", Status:"Approve Started"});

	    	// add activity
	    	$http({
			    method : "POST",
			    url : 'http://localhost:3000/activity/',
			    data : angular.toJson({
			    	SkillId: $scope.skillID, 
			    	UserID: 234, 
			    	Date: $actDate, 
			    	Status: "Approve Skill", 
			    	Notes:"Skill activity logged."
			    }),
			    headers : {
			        'Content-Type' : 'application/json'
				}
			}).then( _success, _error );
     
            function _success(response) {
				console.log("Activity Add success for " + $scope.skillID);
				// refresh activity list
				$http.get('http://localhost:3000/activity/?SkillId=' + parseInt($scope.skillID)).then(activitySuccessCallback, errorCallback);
            };
     
            function _error(response) {
                console.log(response.statusText);
            };
     

	        $uibModal.open({
	            templateUrl: 'skillApproveModal.html', // loads the template
	            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
	            windowClass: 'modal modal-center-vertical', // windowClass - additional CSS class(es) to be added to a modal window template
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
			var $actDate = new Date();
	    	$scope.activityLog.push({Id: $scope.skill.Id, UserID: 123, Date: $actDate, Notes: "Open Reject", Status:"Reject Started"});

			$uibModal.open({
				templateUrl: 'skillRejectModal.html', // loads the template
				backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
				windowClass: 'modal modal-center-vertical theme-alt in', // windowClass - additional CSS class(es) to be added to a modal window template
				controller: function($scope, $uibModalInstance, skill) {
	            	$scope.skill = skill;
	            	$scope.ok = function(e) {
	            		$uibModalInstance.close();
			    		e.stopPropagation();
			    	};
			    	$scope.close = function(e) {
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