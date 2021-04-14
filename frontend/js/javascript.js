//Starting point for JQuery init
$(document).ready(function () {
    loaddata("Doe");
});

function loaddata(searchterm) {

    $.ajax({
        type: "GET",
        url: "../backend/serviceHandler.php",
        cache: false,
        data: {method: "queryPersons", param: searchterm},
        dataType: "json",
        success: function (response) {
            console.log(response);
            //$("#noOfentries").val(response.length);
            //$("#searchResult").show(1000).delay(1000).hide(1000);
        }
        
    });
}