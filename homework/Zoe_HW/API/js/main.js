var solution;

var degrees = document.getElementById('number').value;

var optionChosen = document.getElementsByName('temptype');

function determineConverter(e) {
 
}


var button = document.getElementById("displaysconvert");

button.onclick = determineConverter;

'use strict';

//What is the phase of the moon tonight?

// function moonPhase() {
//  $.ajax({
//        url: "http://api.wunderground.com/api/5d0612849c444de1/astronomy/q/37210.json",
//      dataType: "jsonp",
//      success : function(data){
//        console.log(data);
//        console.log(data.moon_phase);
//        console.log(data.moon_phase.phaseofMoon)
//      }
//  });
// }
// moonPhase();
// 

//In what year was the record low temperature for today's date?  use almanac
// function recordLow() {
//  $.ajax({
//    url: "http://api.wunderground.com/api/5d0612849c444de1/almanac/q/37210.json",
//    dataType: "jsonp",
//    success : function(data){
//      console.log(data);
//      console.log(data.almanac.temp_low.recordyear)
//    }
//  });
// }
// recordLow();
