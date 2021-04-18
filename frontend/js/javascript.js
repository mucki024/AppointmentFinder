//Starting point for JQuery init

// methodnames for accessing db
var methodName = ["allAppointments","appointmentOptions","appointmentUsers"];
//var dbResponse;

$(document).ready(function () {
    loaddata(methodName[0],"");     //load all appointments
    $("#listAppointments").on("click","button",loadAppointment);     // click on appointment to see details (needs to be defined here, for future buttons => because jquery)
    $("#appointmentDetails").hide();
});

function loaddata(methodN,searchterm) {     // for loading data from db => should be used multiple times depending on desired query
    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: methodN, param: searchterm},
        dataType: "json",
        success: function (response) {      // successfully loaded data from db 
            //console.log(response);
            switch(methodN){
                case methodName[0]:     //data for all appointments
                    showAppointments(response);     //
                    break;
                case methodName[1]:     //data for single appointment options
                    showAppointmentOptions(response);
                    break;
                case methodName[2]:     //data for useer comments and other votes
                    showAppointmentUserData(response);
                    break;
                default:
            }
        },
        error: function(response){
            console.log("Ajax was not succesfull=> returned Object(JSON) might not be corretly formated")
        }
    });
}

function showAppointments(serverResponse){      // load appointments into list
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

function loadAppointment(){        // executed if clicked on appointment  => another case in ajax => get appointment options
    let appointmentID= $(this).attr('id'); //appointmentID
    console.log("app click works");
    loaddata(methodName[1],appointmentID);     //load all appointments
    loaddata(methodName[2],appointmentID);     //load all appointments
}

function showAppointmentOptions(serverResponse){        // executed after data from server is here (generated after cklick on certain appointment)
    let tbl = '<tr><th scope="col">Username</th></tr>';
    $("thead").append(tbl);     //create tbl head
    for(let entry of serverResponse){
        let txt1 = '<th scope="col">'; //oncklick="showAppointment(this)"
        let txt2 = entry["dateOption"];
        let txt3 = '</th>';
        $("thead").children().append(txt1+txt2+txt3);        //append in tablerow of head
    }
    $("#appointmentDetails").show();
}

function showAppointmentUserData(serverResponse){        // executed after data from server is here (generated after cklick on certain appointment)
    console.log(serverResponse);
    for(let entry of serverResponse){
        let txt1 = '<tr><td>'; //oncklick="showAppointment(this)"
        let txt2 = entry["UserName"];
        let txt3 = '</td></tr>';
        $("tbody").append(txt1+txt2+txt3);        //append in tablerow of head
    }
    
}