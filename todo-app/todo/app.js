var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('woot!')
});

var todoSchema = mongoose.Schema({
    due_date: Date, 
    timestamp: {type: Date, default: Date.now},
    description: String, 
    title: String, 
    priority: Number, 
    complete: Boolean
});

var Todo = mongoose.model('Todo', todoSchema)

var firstTodo = new Todo({
  due_date: Date.now(), 
  description: "My first to do item", 
  title: "First", 
  priority: 10, 
  complete: false
});

firstTodo.save(function (err, firstTodo) {
  if (err) return console.error(err);
  console.log(firstTodo);
});


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.post('/items', function (req, res) {
  res.send('To Do Item Received!');
});

app.post('/todo', function (req, res) {
  console.log(req);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
