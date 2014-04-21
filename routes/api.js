/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var data = {
  "tasks": [
   {
    "title": "Stupid Task",
    "description": "This is quite a stupid task",
    "responsible": "Adrian Schmid",
    "status":"todo",
    "costestimate": 2
    },
    {
    "title": "Fun Task",
    "description": "This is quite a fun task",
    "responsible": "Adrian Schmid",
    "status":"todo",
    "costestimate": 5
    },
    {
    "title": "Example Task",
    "description": "We are currently working on this",
    "responsible": "Adrian Schmid",
    "status":"inprogress",
    "costestimate": 3
    },
    {
    "title": "Hard Task",
    "description": "This task takes longer then expected",
    "responsible": "Adrian Schmid",
    "status":"inprogress",
    "costestimate": 8
    },
    {
    "title": "Easy Task",
    "description": "That was an easy one",
    "responsible": "Adrian Schmid",
    "status":"done",
    "costestimate": 1
    }
  ]
};

// GET
exports.tasks = function (req, res) {
  var tasks = [];
  data.tasks.forEach(function (task, i) {
    tasks.push({
      id: i,
      title: task.title,
      description: task.description.substr(0, 50) + (task.description.length > 50 ? '...' : ''),
      responsible: task.responsible,
      status: task.status,
      costestimate: task.costestimate
    });
  });
  res.json({
    tasks: tasks
  });
};

exports.task = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.tasks.length) {
    res.json({
      task: data.tasks[id]
    });
  } else {
    res.json(false);
  }
};

// POST
exports.addTask = function (req, res) {
  data.tasks.push(req.body);
  res.json(req.body);
};

// PUT
exports.editTask = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.tasks.length) {
    data.tasks[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE
exports.deleteTask = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.tasks.length) {
    data.tasks.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};