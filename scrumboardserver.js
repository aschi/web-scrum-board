
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');

var http = require('http');
var path = require('path');

var app = express();

// Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
// app.get('/', routes.index);

// JSON API
app.get('/api/task', api.tasks);

app.get('/api/task/:id', api.task);
app.post('/api/task', api.addTask);
app.put('/api/task/:id', api.editTask);
app.delete('/api/task/:id', api.deleteTask);

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);

// Start server
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});