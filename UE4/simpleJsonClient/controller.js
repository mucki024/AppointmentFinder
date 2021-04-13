//Starting point for JQuery init
$(document).ready(function () {
    $("#searchResult").hide();
    $("#btn_Search").click(function (e) {
       loaddata($("#seachfield").val());
    });
});

function loaddata(searchterm) {     
    let methode= checkRadio();

    if(document.getElementById("newContent") !== null){     // delete result after button is clicked second time
        $("#newContent").remove();
        console.log("deleted");
    }
    $.ajax({
        type: "GET",        // http request
        url: "../serviceHandler.php",
        cache: false,
        data: {method: methode, param: searchterm},     // data which is transprted to backend => method from user input
        dataType: "json",
        success: function (response) {
            console.log(response);      // array looks like reponse[ [JSON Object,something else] [Object,something else]]
            $("#dynamic").load("../clientpart/simplepart.html",function(){dynamicContent(response)});        // dynamically loading additianal hmtl elements => selector needed
        },      // callback function neeeded to start with adapting additional html after loading of file
        error: function (response){
            $("#noOfentries").val("nothing found :(");
            $("#searchResult").show(1000).delay(1000).hide(800);
        }
    });
}

function checkRadio(){      // check which radio button checked from user => different methods aquairing the data from backend
    let methode;
    if($("#radio1").prop("checked")){
        methode= "queryPersonByName";
        return methode;
    }
    if($("#radio2").prop("checked")){
        methode= "queryPersonById";
        //console.log("radio2");
        return methode; 
    }
    if($("#radio3").prop("checked")){
        methode= "queryPersonByDepartment";
        return methode; 
    }
    if($("#radio4").prop("checked")){
        methode= "queryPersons";
        return methode; 
    }
}


function dynamicContent(respServer){        // this method starts after new html is fully loaded, give out information from backend
    //let arrG=[];
    for (let index in respServer) {
        let JSobj = respServer[index][0];
        //let arrS=[];
        $("#dynTb").append("<tr id=tblRow"+ index+">");     // create new table row  (use id to put in new elements)
        for (let key in JSobj){
            let value = JSobj[key];
            //console.log(value);
            if(key=="firstname" || key=="lastname" || key=="email" || key=="department" || key=="phone"){
                $("#tblRow"+index).append("<td>"+value+ "</td>");       // take tr and put elements with required information in it
            }
        }
        $("#dynTb").append("</tr>");
        //arrG.push(arrS);
    }
  }