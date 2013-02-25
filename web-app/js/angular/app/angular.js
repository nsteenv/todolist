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

    $scope.tasks = Task.query()

  };
}).call(this);
