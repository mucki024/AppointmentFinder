
<?php 
    //require_once '../backend/db/dbConfig.php';
    //require_once '../backend/serviceHandler.php';
?>


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
    
    <script src="app.ts"></script>
      <title>TimeFinder</title>
  </head>

	 <body style="background-color:powderblue;">
   
   <?php  //  All appointments will be shown here  ?>
  <fieldset style="margin-left:20%;margin-right:20%;font-family:sans-serif;padding:15px;border-radius:5px;background:#919191;border:5px solid #1F497D">
 <div class="container">
   <h1>Overview of the appointments:</h1>
   
      <div class="list-group" id="listAppointments">
      </div>  
      <div class="table-responsive" id="appointmentDetails">
      <table class="table table-hover" id="appointmentTable">
      <thead></thead>
      <tbody></tbody>
     </table>
    
    </fieldset>
  </div>
<br><br>


    <?php  //  All options will be shown here  ?> 
   
    <footer>
    <div class="container">
   
 
<fieldset style="margin-left:20%;margin-right:20%;font-family:sans-serif;padding:15px;border-radius:5px;background:#919191;border:5px solid #1F497D">
  <h1>Create an appointment:</h1>
  <label for="name"> Name:</label>
  <input type="text" id="name" name="name"><br>
  <label for="comment">Comment:</label>
  <input type="text" id="comment" name="comment"><br>
<div class="form-check">
  <input class="form-check-input" type="checkbox" name="date" value="" id="date1">
  <label class= "form-check-label" for="date1">
  Hardcoded 20.04.2021
  </label>
</div><br>
<div class="form-check">
  <input class="form-check-input" type="checkbox" name="date" value="" id="date2">
  <label class="form-check-label" for="date2">
  Hardcoded 21.04.2021
  </label>
</div><br>
<div class="form-check">
  <input class="form-check-input" type="checkbox" name="date" value="" id="date3" >
  <label class="form-check-label" for="date3">
  Hardcoded 22.04.2021</label>
</div><br>
  <button type="button" class="btn btn-success" id="button">Accept</button>
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


 