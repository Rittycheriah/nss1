var express = require('express');
var router = express.Router();
var UserController = require('../UserController');
var auctionItems = [];

var auctionItem = require('../models/auctionItem');

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

/* GET auction page. */
router.get('/', function(req, res, next) {
  res.render('auction', { title: 'Savings Multiplied' });
});

//GET create item page 
router.get('/createItem', function (req, res, next) {
	// if (UserController.getCurrentUser() === null) {
 //    res.redirect("/users/login");
 //  }

  res.render('createItem',{});
});

//POST create item page 
router.post('/createItem', function (req, res, next) {
	
	//Who is the user? 
	var theUser = UserController.getCurrentUser();

  //What did the user enter in the form? 
  var theFormPostData = req.body
  theFormPostData.user = theUser._id;

  console.log('theFormPostData', theFormPostData);

  var myAuctionItem = new auctionItem(theFormPostData);

  myAuctionItem.save(function (err, todo) {
  	if (err) {
      sendError(req, res, err, 'Failed to save task');
  	} else {
  		res.redirect('/auction');
  	}
  });
});

module.exports = router;
