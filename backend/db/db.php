
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
            $wholeData= $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $wholeData;
        }

        public function getAppointmentOptions($appID){        // query appointment options
            $stmt = $this->db->prepare("SELECT appointments.Titel,choosedate.choiceDateID,choosedate.dateOption,choosedate.votes,appointments.Dauer,choosedate.appointmentsID FROM choosedate JOIN appointments ON choosedate.appointmentsID=appointments.AppointmentID WHERE choosedate.appointmentsID=? ");
            $stmt->bindParam(1,$appID);
            $stmt->execute();
            $wholeData= $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $wholeData;
        }

        public function getAppointmentUserData($appID){        // query appointment User data
            $stmt = $this->db->prepare("SELECT userchoice.choiceDateID,userchoice.userName,userchoice.comment,choosedate.dateOption FROM userchoice JOIN choosedate ON userchoice.choiceDateID=choosedate.choiceDateID WHERE userchoice.appointmentsID=?");
            $stmt->bindParam(1,$appID);
            $stmt->execute();
            $wholeData= $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $wholeData;
        }

        public function createAppointmentDB($titel,$place,$duration,$expireDate){
            $stmt = $this->db->prepare("INSERT INTO appointments (Titel, Ort, Dauer, Ablaufdatum) VALUES (?, ?, ?, ?)");
            $stmt->bindParam(1,$titel);
            $stmt->bindParam(2,$place);
            $stmt->bindParam(3,$duration);
            $stmt->bindParam(4,$expireDate);
            $stmt->execute();
            $last_id = $this->db->lastInsertId();
            return $last_id;
        }

        public function createDateOption($appindex, $dateOption){
            $stmt = $this->db->prepare("INSERT INTO choosedate (dateOption, appointmentsID) VALUES (?, ?)");
            $stmt->bindParam(1,$dateOption);
            $stmt->bindParam(2,$appindex);
            $stmt->execute();
        }

        public function saveChoice($username,$singleChoice,$appID){
            $stmt = $this->db->prepare("INSERT INTO userchoice (userName, choiceDateID,appointmentsID) VALUES (?, ?, ?)");
            $stmt->bindParam(1,$username);
            $stmt->bindParam(2,$singleChoice);
            $stmt->bindParam(3,$appID);
            $stmt->execute();
            $last_id = $this->db->lastInsertId();
            $this->increaseVotes($singleChoice);
            return $last_id;
        }

        public function increaseVotes($singleChoice){
            $stmt = $this->db->prepare("UPDATE choosedate SET votes= votes+1 WHERE choiceDateID=?");
            $stmt->bindParam(1,$singleChoice);
            $stmt->execute();
        }

        public function saveComment($lastID,$comment){
            $stmt = $this->db->prepare("UPDATE userchoice  SET comment=? WHERE userChoiceID=?");
            $stmt->bindParam(1,$comment);
            $stmt->bindParam(2,$lastID);
            $stmt->execute();
        }
        

        function __destruct() { // close db connection
            $this->db = null;
        }
    }

?>