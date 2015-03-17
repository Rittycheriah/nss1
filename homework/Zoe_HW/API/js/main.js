
//intialize function once click is pressed
 $("#daButton").click(function getWeather() {
  event.preventDefault();
//Getting zip to autofill
$.getJSON("http://ip-api.com/json", function( json ) {
  console.log( "JSON Data: " + json.responseJSON);
 });

//Zipcode must be "get" from HTML
 var zip = $("textarea#zip").val();
  console.log(zip);

//Define what the results will go in
  var time;
  var degrees;
  var location;

// Ajax callback to API to get data back
   $.ajax({
       //Zipcode concatenated with API URL
       url: "http://api.wunderground.com/api/5d0612849c444de1/conditions/q/" + zip + ".json",
       dataType: "jsonp",
       success : function(data){
         console.log(data);

          //Specify which portions of data to use
         console.log(data.current_observation.observation_time_rfc822);
         console.log(data.current_observation.temp_f);
         console.log(zip);

         //writing those elements to the div
         $('#resultdiv').append(data.current_observation.observation_time_rfc822);
         $('#resultdiv2').append(data.current_observation.temp_f + "  degrees");
         $('#resultdiv3').append(zip);
       } 
    });
  $('#resultdiv').html(time, degrees, location);
});
// Write to div and display data from API 


