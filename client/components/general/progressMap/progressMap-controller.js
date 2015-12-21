'use strict';

angular.module('Tour-Track')
.controller('ProgressMapCtrl', ['$scope', 'General', 'ProgressMapFactory', function($scope, General, ProgressMapFactory) {

	$scope.progress = 0;

	$scope.setProgress = function(progress) {
		$scope.progress = progress;
	}

	ProgressMapFactory.showsPerMonth().then(function(data) {
		$scope.showsPerMonth = data;
		return data;
	});

}]);