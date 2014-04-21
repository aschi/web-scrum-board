describe('Scrumboard controllers', function() {
 
  describe('scrumBoardCtrl', function(){
    var scope, ctrl;
 
    beforeEach(module('scrumboardApp'));

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      // backend definition common for all tests
       
      // Get hold of a scope (i.e. the root scope)
      $rootScope = $injector.get('$rootScope');
      // The $controller service is used to create instances of controllers
      var $controller = $injector.get('$controller');
    
      createController = function() {
        return $controller('scrumBoardCtrl', {'$scope' : $rootScope });
      };

      ctrl = createController();
    }));


    it('should supply an empty task object for creation', function() {
      var emptyTask = {
        "id" : -1,
        "title": "",
        "description": "",
        "responsible": "",
        "status":"todo",
        "costestimate": 1
      };

      expect($rootScope.newTask).toEqual(emptyTask) ;
    });

    it('should open the empty task on createTask', function() {
      var emptyTask = {
        "id" : -1,
        "title": "",
        "description": "",
        "responsible": "",
        "status":"todo",
        "costestimate": 1
      };

      $rootScope.createTask();
      expect($rootScope.opened).toEqual(emptyTask);
    });

    it('should open a given task', function() {
      var someTask = {
        "id" : 4,
        "title": "Test Title",
        "description": "This is the description",
        "responsible": "Adrian Schmid",
        "status":"todo",
        "costestimate": 1
      };

      $rootScope.open(someTask);
      expect($rootScope.opened).toEqual(someTask);
    });

    it('should detect wheter a given task is open (positive test)', function() {
      var someTask = {
        "id" : 4,
        "title": "Test Title",
        "description": "This is the description",
        "responsible": "Adrian Schmid",
        "status":"todo",
        "costestimate": 1
      };

      $rootScope.open(someTask);
      expect($rootScope.isOpen(someTask)).toBe(true);
    });

    it('should detect wheter a given task is open (negative test)', function() {
      var someTask = {
        "id" : 4,
        "title": "Test Title",
        "description": "This is the description",
        "responsible": "Adrian Schmid",
        "status":"todo",
        "costestimate": 1
      };

      var someOtherTask = {
        "id" : 4,
        "title": "Test Title 2",
        "description": "This is the description",
        "responsible": "Adrian Schmid",
        "status":"done",
        "costestimate": 5
      };

      $rootScope.open(someTask);
      expect($rootScope.isOpen(someOtherTask)).toBe(false);
    });

    it('should detect wheter anything is open (positive test)', function() {
      var someTask = {
        "id" : 4,
        "title": "Test Title",
        "description": "This is the description",
        "responsible": "Adrian Schmid",
        "status":"todo",
        "costestimate": 1
      };
      $rootScope.open(someTask);
      expect($rootScope.anyItemOpen()).toBe(true);
    });

    it('should detect wheter anything is open (negative test)', function() {
      expect($rootScope.anyItemOpen()).toBe(false);
    });

    it('should send a delete request to the api', function(){
      var someTask = {
        "id" : 4,
        "title": "Test Title",
        "description": "This is the description",
        "responsible": "Adrian Schmid",
        "status":"todo",
        "costestimate": 1
      };

      $httpBackend.expectDELETE('/api/task/4');
      $rootScope.deleteTask(someTask);
    });

    it('should send a get request to the api', function(){
      $httpBackend.expectGET('/api/task');
      $rootScope.updateTasksFromServer();
    });

  });

  describe('taskCtrl', function(){
    var scope, ctrl;
 
    beforeEach(module('scrumboardApp'));

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      // backend definition common for all tests
       
      // Get hold of a scope (i.e. the root scope)
      $rootScope = $injector.get('$rootScope');
      // The $controller service is used to create instances of controllers
      var $controller = $injector.get('$controller');
    
      createController = function() {
        return $controller('taskCtrl', {'$scope' : $rootScope });
      };

      ctrl = createController();
    }));

    it('should send a post request to the api', function(){
      var someNewTask = {
        "id" : -1,
        "title": "Test Title",
        "description": "This is the description",
        "responsible": "Adrian Schmid",
        "status":"todo",
        "costestimate": 1
      };
      $rootScope.opened = someNewTask;
      $httpBackend.expectPOST('/api/task', {
        "title": "Test Title",
        "description": "This is the description",
        "responsible": "Adrian Schmid",
        "status":"todo",
        "costestimate": 1
      });
      $rootScope.save();
    });

    it('should send a put request to the api', function(){
      var someTask = {
        "id" : 4,
        "title": "Test Title",
        "description": "This is the description",
        "responsible": "Adrian Schmid",
        "status":"todo",
        "costestimate": 1
      };
      $rootScope.opened = someTask;
      $httpBackend.expectPUT('/api/task/4', {
        "title": "Test Title",
        "description": "This is the description",
        "responsible": "Adrian Schmid",
        "status":"todo",
        "costestimate": 1
      });
      $rootScope.save();
    });
  });
});
