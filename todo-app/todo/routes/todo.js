var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  due_date: Date,
  timestamp: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  priority: Number,
  complete: {
    type: Boolean,
    required: true,
    default: false
  }
});

var Todo = mongoose.model('Todo', todoSchema);

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log("Yay, we have connected");
});

// Send the todo list back to the client
var sendTodoList = function(req, res, next) {
  Todo.find({}, function(err, list) {
    if (err) {
      console.log(err);
    } else {
      res.render("todoList", {
        title: "List of tasks",
        message: "Things you still need to do",
        todos: list
      });
    }
  });
}

/*GET todo page list client to /todo/list */

router.get('/', function(req, res, next) {
  //rendering todo items to the page
  return Todo.find(function(err, tasks) {
    res.render('todo', {
      tasks: tasks
    });
    if (!err) {
      console.log("Monkeys ate my face");
      console.log(tasks);
    } else {
      return console.log(err);
    }
  });
});


/*Post form */
router.post('/', function(req, res, next) {
  console.log(req.body);
  //editing an existing item
  if (req.body.db_id !== "") {
    //Find It
    Todo.findOne({ _id : req.body.db_id}, function(err, foundTodo) {
      console.log(req.body);
   
      if (err) {
        console.log(err);
        res.render("error", {
          error: {
            status: 500,
            stack: JSON.stringfy(err.errors)
          },
          message: "Could not find that task."
        });
      } else {
        console.log(foundTodo);
        foundTodo.title = req.body.titletext;
        foundTodo.description = req.body.destext;
        foundTodo.priority = req.body.priority;
        foundTodo.due_date = req.body.due_date;
        foundTodo.complete = (req.body.complete) ? req.body.complete : false;

    //Save the updated item. 
    foundTodo.save(function(err, newOne) {
      if (err) {
        res.render("error", {
          error: {
            status: 500,
            stack: JSON.stringfy(err.errors)
          },
          message: "Could not save task with updated info"
        });
      } else {
        res.redirect('/todo');
      }
    });
   }
  });
  } else {

    //User is creating new item
    console.log('reached Todo');
    new Todo({
      due_date: req.body.due_date,
      title: req.body.titletext,
      description: req.body.destext,
      priority: req.body.priority,
      complete: req.body.complete
    }).save(function(err, task) {
      console.log('saved');
      if (err) {
        res.render("error", {
          message: "Fail Hard",
          error: {
            status: "Not"
          }
        });
        console.log(task);
      } else {
      res.redirect('/todo');
    }
    });
  }
});

//get request from _id 
router.get('/:id', function(req, res) {

  Todo.find({
    _id: req.params.id
  }, function(err, item) {
    var thisItem = item[0];

    // Was there an error when retrieving?
    if (err) {
      console.log(err);

      // Find was successful
    } else {
      res.render('index', {
        bodyt: 'here is what we have',
        title: 'Edit me',
        todo: thisItem
      });
    }
  });
});


// handle a delete from the list
router.delete('/', function(req, res) {
  console.log('reached node to delete');
  console.log(req.body);
  Todo.find({
      id: req.body.todo_id
    })
    .remove(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send('success');
        console.log('removed item');
      }
    });
});

module.exports = router;