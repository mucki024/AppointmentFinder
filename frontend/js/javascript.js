//Starting point for JQuery init

// methodnames for accessing db
var methodName = ["allAppointments",""];

$(document).ready(function () {
    loaddata(methodName[0],"");
});

function loaddata(methodN,searchterm) {     // for loading data from db
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "allAppointments", param: searchterm},
        dataType: "json",
        success: function (response) {
            console.log(response);
        },
        error: function(response){
            console.log("Ajax was not succesfully => returned Object(JSON) might be not corretly formated")
        }
        
    });
}