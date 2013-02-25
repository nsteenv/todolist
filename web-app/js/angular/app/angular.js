(function() {
    var appName = 'todolist';
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

    TaskListCtrl = function($scope, Grails, $http) {
        var Task = Grails.getResource($scope);

        $scope.tasks = Task.query()

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

        $scope.delTask = function (task){
            Task.remove(task, function (){
                var index = $scope.tasks.indexOf(task);
                $scope.tasks.splice(index,1);
            })
        }

        $scope.updateTask = function (task){
            $http.put("/todolist/task",task);
        }

    };

    angular.module(appName, ['todolistServices']);

}).call(this);
