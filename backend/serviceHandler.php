<?php

include("../backend/businesslogic/simpleLogic.php");

$param = "";
$method = "";

isset($_GET["method"]) ? $method = $_GET["method"] : false; //ajax sent data from frontend to php file => get request necessary
isset($_GET["param"]) ? $param = $_GET["param"] : false;
isset($_POST["method"]) ? $method = $_POST["method"] : false;           //post is for formular data
isset($_POST["parameter"]) ? $param = json_decode($_POST["parameter"],true) : false;
//isset($_GET["parameter"]) ? $param = json_decode($_GET["parameter"],true) : false;
/*
unset($_GET["method"]);
unset($_GET["param"]);
unset($_POST["method"]);
unset($_POST["parameter"]);
*/
$logic = new SimpleLogic();
$result = $logic->handleRequest($method, $param);
if ($result == null) {
    response("GET", 400, null);
} else {
    response("GET", 200, $result);
}

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
}


?>