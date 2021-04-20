<?php

include("../backend/businesslogic/simpleLogic.php");

$param = "";
$method = "";

isset($_POST["method"]) ? $method = $_POST["method"] : false; //ajax sent data from frontend to php file => get request necessary
isset($_POST["param"]) ? $param = $_POST["param"] : false;

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