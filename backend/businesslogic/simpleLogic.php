<?php

include("../backend/db/dataHandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {
            case "allAppointments":
               $res = $this->dh->queryAllAppointments();
                break;
            case "appointmentOptions":
                $res = $this->dh->queryAppointmentOptions($param);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
