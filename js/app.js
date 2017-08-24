(function(angular) {
  'use strict';
  /*应用程序的主模块*/
	var myApp = angular.module('MyTodoMvc',[]);



	myApp.controller('MainController',['$scope','$location',function($scope,$location){
		/*文本框需要一个模型*/
		$scope.text = '';
		/*任务列表页需要一个*/
		$scope.todos = [{
			id:1,text:'吃饭',completed:false
		},{
			id:2,text:'吃饭',completed:false
		},{
			id:3,text:'睡觉',completed:true
		},];
		/*每一个任务的结构{id:1,text:chifan,completed:true}*/
		/*添加todo任务*/
		$scope.add = function(){
			if(!$scope.text){
				return;
			}
			$scope.todos.push({
				//自动增长
				//id:$scope.todos.length+1,不行
				id:getId(),
				//由于$scope.text是双向数据绑定，add的同时可以拿到界面的输入的数据
				text:$scope.text,
				completed:false
			});
			$scope.text = '';
		};
		function getId(){
			var id = Math.random();
			for(var i = 0;i<$scope.todos.length;i++){
				if ($scope.todos[i].id === id) {
					id = getId();
				}
				break;
			}
			return id;
		}
		// 处理删除
	    $scope.remove = function(id) {
	      // 删除谁
	      for (var i = 0; i < $scope.todos.length; i++) {
	        if ($scope.todos[i].id === id) {
	          $scope.todos.splice(i, 1);
	          break;
	        }
	      }
	    };
	    // 清空完成的任务
	    $scope.clear = function() {
	      var result = [];
	      for (var i = 0; i < $scope.todos.length; i++) {
	        if (!$scope.todos[i].completed) {
	          result.push($scope.todos[i]);
	        }
	      }
	      $scope.todos = result;
	    };
	    //是否有完成的任务
	    $scope.existCompleted = function(){
	    	for (var i = 0; i < $scope.todos.length; i++) {
		        if ($scope.todos[i].completed) {
		          return true;
		        }
		    }
	    	return false; 
	    };
	     // 当前编辑哪个元素
	    $scope.currentEditingId = -1;
	    // -1代表一个肯定不存在的元素，默认没有任何被编辑
	    $scope.editing = function(id) {
	      $scope.currentEditingId = id;
	    };
	    $scope.save = function() {
	      $scope.currentEditingId = -1;
	    };
	    // $scope.checkall = false;
	    // $scope.$watch('checkall',function(now,old){
	    // 	for (var i = 0; i < $scope.todos.length; i++) {
		   //      $scope.todos[i].completed = now;
		   //  }
	    // });
	    var now = true;
	    $scope.toggleAll = function(){
	    	for (var i = 0; i < $scope.todos.length; i++) {
		        $scope.todos[i].completed = now;
		    }
		    now = !now;
	    };
	      // 状态筛选
    $scope.selector = {}; // {} {completed:true} {completed:false}
    // 点击事件的方式不合适，有DOM操作
    // 让$scope也有一个指向$location的数据成员
    $scope.$location = $location;
    //console.log($location);
    //console.log($location.$$hash);
    // watch只能监视属于$scope的成员
    $scope.$watch('$location.$$hash', function(now, old) {
      // 1. 拿到锚点值
      // 这样写就要求执行环境必须要有window对象
      // var hash = window.location.hash;
      
      
      // 2. 根据锚地值对selector做变换
      switch (now) {
        case '/active':
          $scope.selector = { completed:false };
          break;
        case '/completed':
          $scope.selector = { completed:true };
          break;
        default:
          $scope.selector = {};
          break;
      }
    });
    //自定义比较函数, 默认filter过滤器使用的是模糊匹配
    $scope.equalCompare = function(source, target) {
      // console.log(source);
      // console.log(target);
      // return false;
      return source === target;
    };


	}]);
})(angular);

