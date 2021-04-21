<?php
include("../backend/models/appointment.php");
include("../backend/db/db.php");
class DataHandler
{
    
    private $db;
    function __construct()
    {
        $this->db = new Database();
    }

    public function queryAllAppointments(){
        $wholeData= $this->db->getAllAppointments();        // query from db => return array with strings
        $objectArr=[];
        foreach($wholeData as $singleRow){      // go through every single row and create new object
            $tempArr= new Appointment($singleRow["AppointmentID"],$singleRow["Titel"],$singleRow["Ort"],$singleRow["Dauer"],$singleRow["Datum"],$singleRow["Ablaufdatum"]);
            array_push($objectArr,$tempArr);    
        }
        return $objectArr;
    }

    public function queryAppointmentOptions($appID){      // get appointment options
        $wholeData= $this->db->getAppointmentOptions($appID);        // query from db => return array with strings
        return $wholeData;
    }

    public function queryAppointmentUserData($appID){
        $userData= $this->db->getAppointmentUserData($appID);
        return $userData;
    }

    public function createAppointment($arrForm){//$arrForm){
        //var_dump($arrForm) ;
        $titel = $arrForm["titel"];
        $place = $arrForm["place"];
        $duration = $arrForm["duration"];
        $expireDate = $arrForm["expireDate"];
        $dateOption1 = $arrForm["dateOption1"];
        $createdIndex= $this->db->createAppointmentDB($titel,$place,$duration,$expireDate);
        $this->db->createDateOption($createdIndex,$dateOption1);
    }
/*
    private static function getAllAppointments(){      //query all appointments, insert them to object array and give back(in Datahandler)
        // prepare sql and bind parameters
        $demodata = [
            new Appointment(1, "Jane", "Doe", "jane.doe@fhtw.at", 1234567, "Central IT"),
            new Appointment(2, "John", "Doe", "john.doe@fhtw.at", 34345654, "Help Desk"),
        ];
       return $demodata;
   }*/
    /*
    public function queryPersonById($id)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->id == $id) {
                array_push($result, $val);
            }
        }
        return $result;
    }
*/
    
}
