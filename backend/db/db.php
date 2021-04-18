
<?php
    //DB Klasse

    class Database{

        private $db;
        function __construct()
        {
            require_once("../backend/db/dbConfig.php");     // config of db needs to be included here because of scope
            $this->db= new PDO("mysql:host=".$host.";dbname=".$database, $user, $password);
        }

        public  function getAllAppointments(){      //query all appointments, insert them to object array and give back(in Datahandler)
             // prepare sql and bind parameters
            $stmt = $this->db->prepare("SELECT * FROM appointments ORDER BY Ablaufdatum");
            $stmt->execute();
            $wholeData= $stmt->fetchAll();
            return $wholeData;
        }

        public function getAppointmentOptions($appID){        // query appointment options
            $stmt = $this->db->prepare("SELECT choosedate.dateOption,choosedate.votes,appointments.Dauer FROM choosedate JOIN appointments ON choosedate.appointmentsID=appointments.appointmentID WHERE choosedate.appointmentsID=? ");
            $stmt->bindParam(1,$appID);
            $stmt->execute();
            $wholeData= $stmt->fetchAll();
            return $wholeData;
        }

        public function getAppointmentUserData($appID){        // query appointment User data
            $stmt = $this->db->prepare("SELECT userchoice.UserName,userchoice.comment,chooseDate.dateOption FROM userchoice JOIN chooseDate ON userchoice.appointmentsID=chooseDate.appointmentsID WHERE userchoice.appointmentsID=?");
            $stmt->bindParam(1,$appID);
            $stmt->execute();
            $wholeData= $stmt->fetchAll();
            return $wholeData;
        }

        function __destruct() { // close db connection
            $this->db = null;
        }
    }

?>