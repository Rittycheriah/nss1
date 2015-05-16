
var Q = require("q");
var express = require('express');
var app = express.Router();
var UserController = require('../userController');
var UserModel = require('../models/user');
var auctionItems = require('../models/auctionItem');

//Sending an error
var sendError = function (req, res, err, message) {
  console.log('Render the error template back to the client.');
  res.render("error", {
    error: {
      status: 500,
      stack: JSON.stringify(err.errors)
    },
    message: message
  });
};

//Handle the get request for registration form 
app.get("/register", function (req, res) {
	console.log('hit register');
  res.render("register");
});

//Handle the post request from the registration form 
app.post('/register', function(req, res) {
	var newUser = new UserModel(req.body);
	console.log('here is the new user', newUser)

	newUser.save(function(err, user) {
		if(err) {
			sendError(req, res, err, 'Failed to register user');
		} else {
			console.log('going to the redirect');
			res.redirect('/index');
		}
	});
});

// //Handling a login action 
// app.post('/login', function(){
// 	console.log('Node handling login route');

// 	//Try to log user w/ given info
// 	UserController.login(req.body.username, req.body.password)
// });

module.exports = app;
