// var output = ""; 

// for (var i = 0; i< 100; i++) {
// 	output= ""; 
// 	if (i % 3 === 0 ) {
// 		output += "fizz"
// 	}
// 	if (i % 5 === 0 ) {
// 		output += "buzz"
// 	}
// 	console.log(i + ": " + output); 

// }

// var last = ""; 

// for(var i = 0; i < 100; i++) {
// 	last=""; 
// 	if(i % 6 === 0 ) {
// 		last += "playing";
// 	}
// 	if (i % 4 === 0 ) {
// 		last += "not playing";
// 	}
// 	console.log(i + " : " + last); 
// }

var express = require('express')
var app = express()

var output = ""; 
var space = "  "; 

for (var i = 0; i< 100; i++) {

	if (i % 3 === 0 ) {
		output += "fizz" + space
	}
	if (i % 5 === 0 ) {
		output += "buzz" + space
	}

}

app.get('/', function (req, res) {
  res.send(output)
})

var firstValue = 1;
var nextValue = 1;
var fib = firstValue + nextValue;

for (var i = 1; i < 9; i++) {
  fib = firstValue + nextValue;
  console.log(fib);
  firstValue = nextValue;
  nextValue = fib;
}

app.get('/bio', function (req, res) {
  res.send ( "This is my bio")
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})