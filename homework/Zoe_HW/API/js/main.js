"use strict";
function getWeather() {
 $.ajax({
       url: "http://api.wunderground.com/api/5d0612849c444de1/conditions/q/37209.json",
     dataType: "jsonp",
     success : function(data){
       console.log(data);
       var time = console.log(data.current_observation.observation_time_rfc822);
       var degrees = console.log(data.current_observation.temp_f);
       var location = console.log("add zip");
     }
 });
}

$( document ).ready(function() {
    console.log(getWeather());
});