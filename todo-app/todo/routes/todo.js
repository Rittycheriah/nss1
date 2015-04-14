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

/*GET todo page*/
router.get('/', function(req, res, next) {
    return Todo.find(function(err, tasks) {
        res.render('todo', {
            tasks: tasks
        });
        if (!err) {
            console.log("Monkeys ate my face");
            console.log(tasks)
        } else {
            return console.log(err);
        }
    });
});

/*Post form */

router.post('/', function(req, res) {
    console.log('reached Todo')
    new Todo({
        due_date: req.body.due_date,
        title: req.body.titletext,
        description: req.body.destext,
        priority: req.body.priority
            //complete: false
    }).save(function(err, task) {
            console.log('saved')
            if (err) {
                res.render("error", {
                    message: "Fail Hard",
                    error: {
                        status: "Not"
                    }
                });
              console.log(task)
            }
            res.redirect('todo');
        
    });
});

module.exports = router;