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
            case "appointmentUsers":
                $res = $this->dh->queryAppointmentUserData($param);
                //($res==NULL) ? $res="no comment" : $res ;           //no comment yet for appointment
                break;
            case "createAppointment":
                //no return
                $this->dh->createAppointment($param);
                $res= "success";        //there is no return from this function => we dont want to send NULL to interface
                break;
            case "createChoice":
                $this->dh->saveChoice($param);
                $res= "success";
                break;
                
            case "deleteApp":
                $this->dh->deleteApp($param);
                $res= "success";
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
