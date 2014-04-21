var scrumboardControllers = angular.module('scrumboardControllers', []);
 
scrumboardControllers.controller('scrumBoardCtrl', function ($scope, $http) {
	$http.get('api/task').success(function(data) {
	  $scope.tasks = data.tasks;
	});
 	
 	$scope.newTask = {
	    "id" : -1,
	    "title": "",
	    "description": "",
	    "responsible": "",
	    "status":"todo",
	    "costestimate": 1
    };

    $scope.createTask = function(){
    	var item = jQuery.extend(true, {}, $scope.newTask);

    	if ($scope.isOpen(item)){
	        $scope.opened = undefined;
	    } else {
	        $scope.opened = item;
	    }
    };

	$scope.open = function(item){
	    if ($scope.isOpen(item)){
	        $scope.opened = undefined;
	    } else {
	    	$scope.backup = jQuery.extend(true, {}, item);
	        $scope.opened = item;
	    }    
	};
	
	$scope.isOpen = function(item){
	    return $scope.opened === item;
	};
	
	$scope.anyItemOpen = function() {
	    return $scope.opened !== undefined;
	};

	$scope.deleteTask = function(item) {
		$http.delete('/api/task/' + item.id).success(function(data) {
        	$scope.updateTasksFromServer();
      	});
	};

	$scope.updateTasksFromServer = function(){
		$http.get('api/task').success(function(data) {
		  $scope.tasks = data.tasks;
		});
	};
});


scrumboardControllers.controller('taskCtrl', function ($scope, $http) {
	$scope.save = function(){
		if($scope.opened.id == -1){
			delete $scope.opened.id;

			$http.post('/api/task', $scope.opened).success(function(data) {
	        	$scope.$parent.$parent.opened=undefined;
	        	$scope.$parent.$parent.updateTasksFromServer();
	    	});
		}else{
			var id = $scope.opened.id;
			delete $scope.opened.id;
			$http.put('/api/task/' + id, $scope.opened).success(function(data) {
				$scope.$parent.$parent.opened=undefined;
				$scope.$parent.$parent.updateTasksFromServer();
			});
		}
	}
});