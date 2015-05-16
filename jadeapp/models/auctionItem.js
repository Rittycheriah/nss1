// auction item schema

var mongoose = require('mongoose');

var auctionItem = mongoose.Schema({
	title: {type: String, required: true, default: ''},
  type: {type: String, required: true, default: ''},
  size: {type: String, required: true, default: ''}, 
  season: {type: String, required: true, default: ''},
  condition: {type: String, required: true, default: ''},
  brand: {type: String, required: true, default: ''}
});

var AuctionModel = require("../models/user");

module.exports = auctionItem;