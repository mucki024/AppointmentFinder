<?php
$host = "localhost";
$user = "bif2webscriptinguser";
$password = "bif2021";
$database = "bif2webscriptinguser";


    $db_obj = new mysqli($host, $user, $password, $database);
    $sql = "SELECT * FROM `appointments`";
    $result = $db_obj->query($sql);

?>
