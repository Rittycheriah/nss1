var express = require('express');
var router = express.Router();

/* GET auction page. */
router.get('/', function(req, res, next) {
  res.render('auction', { title: 'Savings Multiplied' });
});

module.exports = router;
