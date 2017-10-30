'use strict';

angular.module("cortanaCert", [
	'ngRoute',
	'restangular',
	'cortanaCert.certQueue',
	'cortanaCert.skill',
	'cortanaCert.paginate-filter',
	'cortanaCert.uc-filter'
	]).
config(function($locationProvider, $routeProvider, RestangularProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
		.when("/", {templateUrl: "certqueue/certqueue.html", controller: "cortanaCertCtrl"})
		.when("/skill/:id", {templateUrl: "skill/skill.html", controller: "skillCtrl"})
		.otherwise({redirectTo: "/"});
	 RestangularProvider.setBaseUrl('http://localhost:3000/');
});
