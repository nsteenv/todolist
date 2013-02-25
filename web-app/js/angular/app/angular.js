(function() {
  angular.module("todolist", ['todolistServices']);
  angular.module('todolistServices', ['ngResource']).service('Grails', function($resource) {
    return {
      getResource: function(scope) {
        return $resource("/" + appName + "/:controller/:id", {
          controller: scope.controller || '',
          id: scope.id || ''
        }, function() {});
      }
    };
  });

   TaskListCtrl = function($scope, Grails) {
    var Task = Grails.getResource($scope);

    $scope.tasks = Task.query();

       $scope.addTask = function() {
           if( $scope.taskTitle === ""){
               return false
           }
           var newTask = new Task({
               title: $scope.taskTitle,
               done: false
           })
           newTask.$save( function (){
               $scope.tasks.push(newTask.result);
           })
           $scope.taskTitle = "";
       };

  };
}).call(this);
