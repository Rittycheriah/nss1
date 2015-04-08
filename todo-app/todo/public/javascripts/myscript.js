$(document).ready(
    function() {
        $("#main").validate({
            rules: {: "required",
                titletext: {
                    required: true 
                }
                destext: {
                    required: true
                }
            }
        });
    });