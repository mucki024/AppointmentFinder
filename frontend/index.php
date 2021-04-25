<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="js/javascript.js"></script>
    
    <script src="app.js"></script>
      <title>TimeFinder</title>
  </head>

	 <body style="background-color:powderblue;">
   
   <?php  //  All appointments will be shown here  ?>
  <fieldset class="huelle">
  <div class="container">
    <h1>Overview of the appointments:</h1>
        <div class="list-group" id="listAppointments"></div>     
  </div>  
  </fieldset>

    <?php  //  All options will be shown here  ?> 
   
  <footer>
  <div class="container">
   
 
    <fieldset id="appointmentDetails" class="huelle">
      <div class="input-group">
        <h1 id="hOption">Choose an Option:</h1>
        <span class="input-group-btn">
        <button type="button" class="btn btn-default"  id="deleteApp" >delete</button>
        </span>
      </div>
      <div id="userinp">
        <label for="userName"> Username:</label>
        <input type="text" id="userName" name="name"><br>
        <label for="Comment">Comment:</label>
        <input type="text" id="Comment" name="comment"><br>
      </div> 
      <p id="dur">Duration: </p> 
      <p id="ort">Place: </p> 
        <div id="dateOptions">
        </div>
      <button type="button" class="btn btn-success"  id="button">Accept</button>
      
      
    </fieldset>

    <fieldset id="createAppointment" class="huelle">
      <h1>Create new appointment</h1>
      <button type="button" class="btn btn-success"  id="btnFormCreate">create appointment</button>
      <!--form is hidden -->
      <form id="formCreate"  hidden>
        <label for="formTitel">titel</label>
        <input type="name" class="form-control" name="formTitel" id="formTitel" >
        <label for="formPlace">place</label>
        <input type="name" class="form-control" id="formPlace">
        <div id="appendDateOption">
          <label for="formPlace">Dateoption1</label>
          <input type="date" class="form-control" id="formDate1">
          <input type="time" class="form-control" id="formTime1"> 
          <br>
          <button type="button" class="btn btn-success"  id="addOption">add Option</button>         
        </div>
        <label for="formDuration">select duration [h:min]</label>
        <input type="time" id="formDuration" > 
        <label for="formExpireDate">expire date</label>
        <input type="date" class="form-control" id="formExpireDate">
        <input type="time" id="formExpireTime" > 
        <br>
        <button type="submit" class="btn btn-success">Submit</button>
      </form> 
    </fieldset>
  </div>
  </footer>
 </body>
</html>

<script>
$('#button').on('click',function(){
    $("input[name='date']").each(function(){
        if ($(this).is(":checked")) {
            $(this).prop("disabled",true);
        }
    });
});
</script>


 