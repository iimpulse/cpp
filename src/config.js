'use strict';

var app = angular.module("cpp",
	[
	   'main.controller',
	   'main.service',
	   'ngRoute',
	   'popoverDirective',
	   'statsDirective'

	]
)
.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){


	$httpProvider.defaults.cache = false;
	if(!$httpProvider.defaults.headers.get){
		$httpProvider.defaults.headers.get = {};
	}
	$httpProvider.defaults.headers.get['If-Modified-Since'] ='0';
	$routeProvider
	.when('/',{
		templateUrl: '/src/views/main.html',
		controller:'genericCtrl'
	})

}]);
