<?php
class Appointment {
    public $id;
    public $titel;
    public $beschreibung;
    public $ort;
    public $dauer;
    public $datum;
    public $ablaufDatum;

    function __construct($id, $titel,$beschreibung, $ort, $dauer, $datum, $ablaufDatum) {
        $this->id = $id;
        $this->titel = $titel;
        $this->beschreibung = $beschreibung;
        $this->ort=$ort;
        $this->dauer=$dauer;
        $this->datum=$datum;
        $this->ablaufDatum=$ablaufDatum;

      }
}
?>