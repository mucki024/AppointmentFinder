
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
            $stmt = $this->db->prepare("SELECT * FROM appointments");
            $stmt->execute();
            $wholeData= $stmt->fetchAll();
            return $wholeData;
        }

        function __destruct() { // close db connection
            $this->db = null;
        }
    }

?>