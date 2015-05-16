var express = require('express');
var router = express.Router();
var UserController = require('../userController');
var auctionItems = [];

var auctionModel = require('../models/auctionItem');

// Send the error message back to the client
var sendError = function (req, res, err, message) {
  res.render("error", {
    error: {
      status: 500,
      stack: JSON.stringify(err.errors)
    },
    message: message
  });
};

var sendAuctionItems = function (req, res, err, message) {
  //Get current user
  var theUser = UserController.getCurrentUser();

  auctionModel.find({}, function(err, auctionItems) {
 
   //Loop over the array and put in the username
   for (var i = 0; i < auctionItems.length; i++) {
    auctionItems[i].user = theUser.username;
   }

   if (err) {
    console.log(err);
    sendError(req, res, err, "could not get auction list");
   } else {
    res.render('userHome', {
      user: theUser.username, 
      itemLength: auctionItems.length,
      auctionItems: auctionItems
    });
   }
  });
};

/* GET auction page. */
router.get('/', function(req, res, next) {
  console.log("from controller: " + UserController.getCurrentUser());
  res.render('auction', { title: 'Savings Multiplied' });
});


// GET to user Profile
router.get('/profile', function (req,res,next) {
  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/users/login");
  }

  sendAuctionItems(req, res, next);
});

//GET create item page 
router.get('/createItem', function (req, res, next) {
  if (UserController.getCurrentUser() === null) {
    res.redirect("/users/login");
  }

  res.render('createItem',{});
});

//POST create item page 
router.post('/createItem', function (req, res, next) {
	console.log('this is the req', req.body);
	//Who is the user? 
	var theUser = UserController.getCurrentUser();

  console.log('this is the user', theUser);

  //What did the user enter in the form? 
  var theFormPostData = req.body;
  theFormPostData.user = theUser._id;

  console.log('theFormPostData', theFormPostData);

  var myAuctionItem = new auctionModel(theFormPostData);

  myAuctionItem.save(function (err, todo) {
  	if (err) {
      sendError(req, res, err, 'Failed to save task');
  	} else {
  		res.redirect('/auction');
  	}
  });
});

module.exports = router;
