var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Yay, we have connected");
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'To Do List App',  
    bodyt: 'Enter Here',
    todo: {
    	due_date: new Date,
      title: '',
      description: '',
      priority: '',
      completed: false
    }
  });
});

module.exports = router;
