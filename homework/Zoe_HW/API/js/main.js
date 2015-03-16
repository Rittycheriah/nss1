"use strict";

//function for getting API results
function getWeather() {

//results returning as an array
  var resultsReturn = []

 //getting the input from textarea
  // $("button#daButton").click(function () {
  //     var zipCode = "37209";
  //     //$("textarea#zip").val('37209');
  //  })

//API gets from zipCode
   $.ajax({
       url: "http://api.wunderground.com/api/5d0612849c444de1/conditions/" + zipCode +".json",
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

//writing to div
document.getElementById('resultdiv').innerHTML= (time, degrees, location);

}

$(document).ready(function() {
    console.log(getWeather());
});