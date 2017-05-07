'use strict';

var app = angular.module("cpp",
	[
	   'main.controller',
	   'main.service',
	   'ngRoute',
	   'popoverDirective',
	   'statsDirective',
	   'chart.js'
	]
)
.config(['$routeProvider','$httpProvider','ChartJsProvider',function($routeProvider,$httpProvider,ChartJsProvider){


	$httpProvider.defaults.cache = false;
	if(!$httpProvider.defaults.headers.get){
		$httpProvider.defaults.headers.get = {};
	}
	$httpProvider.defaults.headers.get['If-Modified-Since'] ='0';
	$routeProvider
	.when('/',{
		templateUrl: '/src/views/about.html',
		
	})
	.when('/analyze',{
		templateUrl: '/src/views/main.html',
		controller:'genericCtrl',
	}).otherwise('/');


	ChartJsProvider.setOptions({
            chartColors: ['#FF5252', '#FF8A80'],
            responsive: false
          });
          // Configure all line charts
          ChartJsProvider.setOptions('line', {
            showLines: true
          });
}]);
