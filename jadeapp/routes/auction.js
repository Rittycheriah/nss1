var express = require('express');
var router = express.Router();

/* GET auction page. */
router.get('/', function(req, res, next) {
  res.render('auction', { title: 'Savings Multiplied' });
});

//Creating an item will need to go here. 

module.exports = router;
