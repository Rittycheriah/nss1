
var firstName = ["John", "Adam", "Michael"];
var lastName = ["smith", "jones", "baker"];

function fullName(firstNameArray, lastNameArray) {
  firstNameArray.sort().reverse();

  for(var i= 0; i < firstNameArray.length; i++) {
  	for(var j = 0; j < lastNameArray.length; j++) {
      console.log(firstNameArray[i] + " " + lastNameArray[j]);
      }
  }
}

lastName.push("Shepherd")

fullName(firstName, lastName);


// var movies = ["Taken","Titanic","Up","The Cave","Braveheart"];

// console.log(movies.length);

// // console.log(movies.sort());

// console.log(movies.join(','));

// console.log(movies.indexOf("Up"));
// console.log(movies[0]);

// console.log(movies.sort().reverse());



/*
    Fun with functions
// */
// function multiplyByPlus (monkeyButt, iterations, word) {
// 	for (var i = 0; i < iterations; i += 1) {
// 	  console.log(i * (monkeyButt + 1) + word);
// 	}
// }

// multiplyByPlus(2, 20, "row");
// multiplyByPlus(4, 5, "column");

// Log a series of numbers multiplied by 2

// // Log a series of numbers multiplied by 4
// for (var i = 0; i < 10; i += 1) {
//   console.log(i * 4);
// }