(function() {
  describe('service', function() {
    var setup = {};
    beforeEach(module('todolistServices'));
    beforeEach(inject(function(_$httpBackend_, $rootScope, Grails) {
      setup.httpBackend = _$httpBackend_;
      setup.scope = $rootScope.$new();
      setup.grails = Grails;
    }));
    describe('Grails', function() {
      it('should call url with controller, and id', function() {
        setup.httpBackend.expectGET('/todolist/task/1').respond();
        setup.scope.controller = 'task';
        setup.scope.id = '1';
        setup.grails.getResource(setup.scope).get();
      });
      it('should call url with only controller', function() {
        setup.httpBackend.expectGET('/todolist/task/').respond();
        setup.scope.controller = 'task';
        setup.grails.getResource(setup.scope).get();
      });
      return it('should call url without controller or id', function() {
        setup.httpBackend.expectGET('/todolist').respond();
        setup.grails.getResource(setup.scope).get();
      });
    });
  })
  describe('Todolist controllers', function() {
    beforeEach(function() {
      return this.addMatchers({
        toEqualData: function(expected) {
          return angular.equals(this.actual, expected);
        }
      });
    });
    beforeEach(module('todolistServices'));
    beforeEach(inject(function($rootScope) {
      $rootScope.controller = 'task';
    }));
    describe('TodoListCtrl', function() {
      var setup;
      setup = {};
      beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $rootElement) {
        setup.httpBackend = _$httpBackend_;
        setup.httpBackend.expectGET('/todolist/task/').respond([
          {
            title: 'todo1',
            done: false

          }, {
            title: 'todo2',
            done: false
          }
        ]);
        setup.scope = $rootScope.$new();
        return setup.ctrl = $controller(TaskListCtrl, {
          $scope: setup.scope
        });
      }));
      it('should create "tasks" model with 2 tasks fetched from xhr', function() {
        expect(setup.scope.tasks).toEqualData([]);
        setup.httpBackend.flush();
        return expect(setup.scope.taks).toEqualData([
            {
                title: 'todo1',
                done: false

            }, {
                title: 'todo2',
                done: false
            }
        ]);
      });
    });
  });
}).call(this);