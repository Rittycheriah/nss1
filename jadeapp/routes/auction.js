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

   if (err) {
    console.log(err);
    sendError(req, res, err, "could not get auction list");
   } else {
    res.render('userHome', {
      user: theUser.username, 
      auctionItems: auctionItems
    });
   }
  });
};

/* GET auction page. */
router.get('/', function(req, res, next) {
  auctionModel.find({}, function(err, items) {
  console.log('this is from the auction get', items); 
  res.render('auction', { 
    title: 'Savings Multiplied',
    items: items
    });    
  });
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

  res.render('createItem',{
    auctionItem : {
      title: '', 
      type: '', 
      size: '', 
      season: '', 
      condition: '', 
      image: '', 
      brand: '', 
      db_id: ''
    }   
  });
});

//Get to :id = for editting
router.get('/:id', function (req, res) {

  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.redirect("/users/login");
  }

  // Find was successful 
  auctionModel.findOne({_id: req.params.id}, function (err, item) {

    // Was there an error when retrieving

    if (err) {
      sendError(req, res, err, 'Could not find auction item with that id');
    } else {
      res.render('createItem', {
        auctionItem : item
      });
    }
  })
})

// Kate's version
// router.post('/createItem', function (req, res) {
//    var theUser = UserController.getCurrentUser();

//     //Find it
//     auctionModel.findOne({ _id: req.body.db_id}, function (err, auction) {

//       if (err) {
//         console.log(err);
//         sendError(req, res, err, 'Could not find that task');
//       }

//       if (!auction) {
//         auction = new auctionModel();
//         auction.user = theUser.username;
//       }
//         auction.title = req.body.title;
//         auction.type = req.body.type;
//         auction.size = req.body.size;
//         auction.season = req.body.season;
//         auction.condition = req.body.condition;
//         auction.image = req.body.image;
//         auction.brand = req.body.brand;
      

//       //Save it 
//       auction.save(function (err, newOne) {
//         if (err) {
//           sendError(req, res, err, "could not save task with updated info");
//         } else {
//         res.redirect('/auction/profile');
//         }
//       });       
//     })
// });

// POST create item page OR edit page
router.post('/createItem', function (req, res) {
  console.log(req.body);
//   //User is editing an existing item
  if (req.body.db_id !== 'undefined') {
    console.log('hitting the update');
    //Find it
    auctionModel.findOne({ _id: req.body.db_id}, function (err, foundAuction) {

      if (err) {
        sendError(req, res, err, 'Could not find that task');
      } else {
        foundAuction.title = req.body.title;
        foundAuction.type = req.body.type;
        foundAuction.size = req.body.size;
        foundAuction.season = req.body.season;
        foundAuction.condition = req.body.condition;
        foundAuction.image = req.body.image;
        foundAuction.brand = req.body.brand;
      }

      //Save it 
      foundAuction.save(function (err, newOne) {
        if (err) {
          sendError(req, res, err, "could not save task with updated info");
        } else {
          res.redirect('/auction/profile');
        }
      });
    });

  } else {

  console.log('hitting the create');

	console.log('this is the req', req.body);
	//Who is the user? 
	var theUser = UserController.getCurrentUser();

  console.log('this is the user', theUser);

  //What did the user enter in the form? 
  var theFormPostData = req.body;
  theFormPostData.user = theUser.username;

  console.log('theFormPostData', theFormPostData);

  var myAuctionItem = new auctionModel(theFormPostData);

    myAuctionItem.save(function (err, todo) {
    	if (err) {
        sendError(req, res, err, 'Failed to save task');
    	} else {
    		res.redirect('/auction');
    	}
    });
  }
});



//Handling a delete to auction
router.delete('/', function (req, res) {
  auctionModel.find({ _id: req.body.auction_id })
      .remove(function (err) {
      console.log('removed item');
      console.log(req.body);
    // Was there an error when removing?
    if (err) {
      sendError(req, res, err, "Could not delete the task");

    // Delete was successful
    } else {
      res.send("SUCCESS");
    }
  });
});

module.exports = router;
