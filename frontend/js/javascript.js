//Starting point for JQuery init

// methodnames for accessing db
var methodName = ["allAppointments","appointmentOptions"];
//var dbResponse;

$(document).ready(function () {
    loaddata(methodName[0],"");     //load all appointments
    $("#listAppointments").on("click","button",showAppointment);     // click on appointment to see details (needs to be defined here, for future buttons => because jquery)
});

function loaddata(methodN,searchterm) {     // for loading data from db => should be used multiple times depending on desired query
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: methodN, param: searchterm},
        dataType: "json",
        success: function (response) {      // successfully loaded data from db 
            console.log(response);
            switch(methodN){
                case methodName[0]:
                    loadAppointments(response);     //
                    break;
                default:
            }
        },
        error: function(response){
            console.log("Ajax was not succesfully => returned Object(JSON) might not be corretly formated")
        }
    });
}

function loadAppointments(serverResponse){      // load appointments into list
    for(let entry of serverResponse){
        let currentdate=new Date();     //cur dateTime
        let expireDate= new Date(entry["ablaufDatum"]);
        let txt1 = '<button type="button" class="list-group-item list-group-item-action" '; //oncklick="showAppointment(this)"
        let txt4 = 'id="'+entry["id"]+'"';
        let txt2 = '>'+entry["titel"];
        let txt3 = '</button>';
        if(expireDate.getTime() < currentdate){         // appointment already expired => button disabled
            $("#listAppointments").append(txt1+'id="expired" disabled'+txt2+txt3);
            continue;
        }
        $("#listAppointments").append(txt1+txt4+txt2+txt3);
        //$("#"+entry["id"]).on("click",showAppointment(entry["id"]));     // click on appointment to see details (needs to be loaded here=> because jquery)
        //document.getElementById(entry["id"]).addEventListener("click",showAppointment(entry["id"]));
    }
    
}


function showAppointment(){        // executed if clicked on appointment  => another case in ajax => get appointment options
    let appointmentID= $(this).attr('id'); //appointmentID
    console.log("app click works");
    loaddata(methodName[1],appointmentID);     //load all appointments
}
