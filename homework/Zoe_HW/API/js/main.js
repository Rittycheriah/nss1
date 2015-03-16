"use strict";

var results = document.getElementById("resultdiv");

function getWeather() {
 var resultsReturn = []
 
 $("button#daButton").click(function () {
   var zipCode = $("textarea#zip").val();
 })

 $.ajax({
     url: "http://api.wunderground.com/api/5d0612849c444de1/conditions/" + zipCode + ".json",
     dataType: "jsonp",
     success : function(data){
       console.log(data);
       //Return results from API 
       var time = console.log(data.current_observation.observation_time_rfc822);
       var degrees = console.log(data.current_observation.temp_f);
       var location = console.log("add zip");
       resultsReturn = time, degrees, location;
       results.innerHTML = resultsReturn;
       console.log(resultsReturn)
     }
 });
}

// $("button#daButton").click(function () {
//   var zipode = $("textarea#zip").val();
// }
//Create method of getting input information from HTML
// $("textarea#zip").onclick(function() {
//     var zipCode = $("#zip").val('').toString('');
//     console.log(zipCode);
//   })

//Use (e)*click to trigger function
// getWeather(e);

//Call wunderground infromation using user input zip


$( document ).ready(function() {
    console.log(getWeather());
});