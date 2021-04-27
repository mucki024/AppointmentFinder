//Starting point for JQuery init

// methodnames for accessing db
var methodName = ["allAppointments","appointmentOptions","appointmentUsers","createAppointment","createChoice","deleteApp"];
var dateOptions= 1;
//var dbResponse;

$(document).ready(function () {
    loaddata(methodName[0],"");     //load all appointments
    $("#listAppointments").on("click","button",loadAppointment);     // click on appointment to see details (needs to be defined here, for future buttons => because jquery)
    $("#appointmentDetails").hide();
    $("#btnFormCreate").on("click",loadForm);
    $('#formCreate').on("submit",validateForm);
    $('#button').on("click",sendChoice);
    $('#addOption').on("click",addDateOption);
    $('#deleteApp').on("click",deleteAppointment);
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
                    showAppointmentOptions(response,searchterm);
                    break;
                case methodName[2]:     //data for useer comments and other votes
                    showAppointmentUserData(response);
                    break;
                case methodName[3]:
                    console.log("created appointment");
                    break;
                default:
            }
        },
        error: function(response){
            console.log("Ajax was not succesfull=> returned Object(JSON) might not be corretly formated")
        }
    });
}

/*
        display all appointments
*/

function showAppointments(serverResponse){      // load appointments into list
    for(let entry of serverResponse){
        let currentdate=new Date();     //cur dateTime
        let expireDate= new Date(entry["ablaufDatum"]);
        let txt1 = '<button type="button" class="list-group-item list-group-item-action" '; //oncklick="showAppointment(this)"
        let txt2 = 'id="'+entry["id"]+'"';
        let txt3 = '>'+entry["titel"];
        let txt4 = '</button>';
        if(expireDate.getTime() < currentdate){                         //if appointment expired => 
            $("#listAppointments").append(txt1+txt2+'data-expired="true"'+txt3+txt4);
            $('#listAppointments :last-child').css("background-color","grey");
            continue;
        }
        $("#listAppointments").append(txt1+txt2+txt3+txt4);
        //$("#"+entry["id"]).on("click",showAppointment(entry["id"]));     // click on appointment to see details (needs to be loaded here=> because jquery)
        //document.getElementById(entry["id"]).addEventListener("click",showAppointment(entry["id"]));
    }
}

function loadAppointment(){        // executed if clicked on appointment  => another case in ajax => get appointment options
    let appointmentID= $(this).attr('id'); //appointmentID
    loaddata(methodName[1],appointmentID); //loadDateOptions for detail    
}

/*
        display all appointment Details
*/
function showAppointmentOptions(serverResponse,appointmentID){        // executed after data from server is here (generated after cklick on certain appointment)
    console.log(serverResponse);
    $("#hOption").text("Choose for "+serverResponse[0]["Titel"]);
    $("#dur").text("Duration: "+serverResponse[0]["Dauer"]+" [h]");
    $("#ort").text("Place: "+serverResponse[0]["Ort"]);
    let helper=1;
    for(let entry of serverResponse){       //display date options
        let txt1 = '<div class="form-check">';
        let txt2 = '<input class="form-check-input" type="checkbox" data-id="'+entry["choiceDateID"]+'" data-appID='+entry["appointmentsID"]+' id="option'+helper+'">';        //save id of checkbox in html
        let txt3 = '<label class= "form-check-label" for="option'+helper+'">';
        let txt4 = entry["dateOption"]+'</label>';
        let txt5 = '<span> '+entry["votes"]+' votes</span>';
        let txt6 = '</div><br>';
        $("#dateOptions").append(txt1+txt2+txt3+txt4+txt5+txt6);        //append in tablerow of head
        helper++;
    }  
    
    if($("#"+appointmentID).attr("data-expired")=="true"){      //checking if clicked appointment is expired=> hide user interaction possibility
        $("#hOption").text("Appointment "+serverResponse[0]["Titel"]+" is expired");
        $('#userinp').hide();
        $('#button').hide();
        $('.form-check-input').hide();
    }
    $("#deleteApp").attr("data-id",serverResponse[0]["appointmentsID"]);            //save id in delte button
    $("#appointmentDetails").show();
    loaddata(methodName[2],appointmentID);              //after date options loaded=> load user Data
}

function showAppointmentUserData(serverResponse){        // executed after data from server is here (generated after cklick on certain appointment)
    console.log(serverResponse);
    $("#listAppointments").empty();
    let allIndexes= [];     //holds all options for appointment
    for(let entry of serverResponse){
        if(entry["comment"]!==""){            //display comments
            let txt1 = '<div class="card" style="width: 18rem;"><div class="card-body">'; //oncklick="showAppointment(this)"
            let txt2 = '<h5 class="card-title">'+entry["userName"]+'</h5>';
            let txt3 = '<p class="card-text">'+entry["comment"]+'</p>';
            let txt4 = '</div></div>';
            $("#appointmentDetails").append(txt1+txt2+txt3+txt4);        //append in tablerow of head
        }
        if(!allIndexes.includes(entry["choiceDateID"])){        //if dateOption is not spotted yet, include it in array
            allIndexes.push(entry["choiceDateID"]);             //create array with every choice for one appointment
        }
    }   
    for(let singleIndex of allIndexes){     // for every index of dateOptions display the users who voted for it
        let txt1= '<label>Option '+singleIndex+': </label>';
        let txt2= '<ul id="userChose'+singleIndex+'" class="list-group list-group-horizontal"></ul>';       //create new ul for everey option
        $("#appointmentDetails").append(txt1+txt2);
        for(let entry of serverResponse){       //if a user checked this displayed option => display the username
            if(entry["choiceDateID"]== singleIndex){
                let txt3 = '<li class="list-group-item">'+entry["userName"]+'</li>';
                $("#userChose"+singleIndex).append(txt3);
            }
        }
    }
}

function sendChoice(){      //send user choice to backend
    let username= $('#userName').val();
    let comment= ($('#Comment').val()=="" ? null : $('#Comment').val());
    let checkedIDs = [];
    let appID= "";
    $('.form-check-input').each(function() {            // for each input checkbox
        if($(this).is(':checked')){         //if checked checkbox => get id which was stored in html (= ID in database)
            let tempID= $(this).attr("data-id");
            checkedIDs.push(tempID);
            appID= $(this).attr("data-appID");      //ID in DB for appointment
        }
    });
    
    let myObj = { "username": username, "choice":checkedIDs, "comment":comment, "appID": appID};
    console.log(JSON.stringify(myObj));
    //validation needed

    $.ajax({
        type: "POST",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: methodName[4], parameter: JSON.stringify(myObj)},
        dataType: "json",
        success: function (response) {      
            console.log("success");
        }
    });
}

/*
        create new appointment
*/
function loadForm(){        //make form visible and hide create button
    $("#btnFormCreate").hide();
    $("#formCreate").removeAttr("hidden");
    //validateForm();
}

//senden der Daten geht noch nicht => Problem wsl beim entgegennehmen des Backends, Vermutung: data als object
function validateForm(){
    $("#btnFormCreate").show();
    $("#formCreate").attr("hidden",true);
    event.preventDefault();     //important! otherwise the form will reload the whole page and ajax wont be executed right 
    let arrForm = [];
    let titel= $("#formTitel").val();
    let place= $("#formPlace").val();
    let duration= $("#formDuration").val();
    let expireDate= $("#formExpireDate").val();
    let expireTime= $("#formExpireTime").val();
    let expireDateTime = new Date(expireDate+" "+expireTime);
    expireDateTime.setMinutes( expireDateTime.getMinutes() - expireDateTime.getTimezoneOffset() );      // time input is in UTC not local timezone => needs to be converted!!

    for(let x=1; x <= dateOptions; x++){        //dateptions are variable=> save them in array and send them with other information to backend
        let tempDate= $("#formDate"+x).val();
        let tempTime= $("#formTime"+x).val();
        let dateOption = new Date(tempDate+" "+tempTime);
        dateOption.setMinutes( dateOption.getMinutes() - dateOption.getTimezoneOffset() );
        arrForm.push(dateOption);
    }

    let myObj = { "titel": titel, "place": place, "duration": duration, "dateOption1": arrForm, "expireDate": expireDateTime };
    dateOptions =1;         //reset it for new form
    console.log(JSON.stringify(myObj));
    //form validation needs to be added

/*
    $('#formCreate').children('input').each(function () {       // for each input children save user input in array
        arrForm.push(this.value); // "this" is the current element in the loop
    });
    */
    //convert date and time to datetime
    /*
    let dateOption1 = new Date(arrForm[2]+" "+arrForm[3]);
    let expireDate = new Date(arrForm[5]+" "+arrForm[6]);
    //created JS object for better acces in backend
    myObj["titel"] = arrForm[0];
    myObj["place"] = arrForm[1];
    myObj["duration"] = arrForm[4];
    myObj["dateOption1"] = dateOption1;
    myObj["expireDate"] = expireDate;
    */
    //send data as post to backend and as JSON 
    $.ajax({
        type: "POST",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: methodName[3], parameter: JSON.stringify(myObj)},
        dataType: "json",
        success: function (response) {      
            console.log("success");
           // window.location.reload(true);
        }
    });
}

function addDateOption(){       // add new fields to form
    dateOptions++;                  //track amount of date options
    $("#appendDateOption").append('<label for="formPlace">Dateoption'+dateOptions+'</label>');
    $("#appendDateOption").append('<input type="date" class="form-control" id="formDate'+dateOptions+'">');
    $("#appendDateOption").append('<input type="time" class="form-control" id="formTime'+dateOptions+'"> ');
}

function deleteAppointment(){
    let tempID= $(this).attr("data-id");
    console.log(tempID);
    $.ajax({
        type: "POST",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: methodName[5], parameter:tempID },
        dataType: "json",
        success: function (response) {      
            console.log("success");
            window.location.reload(true);
        }
    });
}