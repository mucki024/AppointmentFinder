-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 18. Apr 2021 um 22:20
-- Server-Version: 10.4.14-MariaDB
-- PHP-Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `bif2webscriptinguser`
--
CREATE DATABASE IF NOT EXISTS `bif2webscriptinguser` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bif2webscriptinguser`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointments`
--

CREATE TABLE `appointments` (
  `AppointmentID` int(100) NOT NULL,
  `Titel` varchar(100) NOT NULL,
  `Ort` varchar(100) NOT NULL,
  `Dauer` int(100) NOT NULL,
  `Datum` datetime NOT NULL,
  `Ablaufdatum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`AppointmentID`, `Titel`, `Ort`, `Dauer`, `Datum`, `Ablaufdatum`) VALUES
(1, 'TestBesprechung', 'Vorort', 2, '2021-04-14 14:36:36', '2021-04-23 14:36:36');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `choosedate`
--

CREATE TABLE `choosedate` (
  `choiceDateID` int(100) NOT NULL,
  `dateOption` datetime NOT NULL,
  `votes` int(100) NOT NULL DEFAULT 0,
  `appointmentsID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `choosedate`
--

INSERT INTO `choosedate` (`choiceDateID`, `dateOption`, `votes`, `appointmentsID`) VALUES
(1, '2021-04-15 16:14:45', 0, 1),
(2, '2021-04-16 21:14:45', 0, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `userchoice`
--

CREATE TABLE `userchoice` (
  `userChoiceID` int(100) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `choiceDateID` int(100) NOT NULL,
  `AppointmentsID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `userchoice`
--

INSERT INTO `userchoice` (`userChoiceID`, `userName`, `comment`, `choiceDateID`, `AppointmentsID`) VALUES
(1, 'Martin', 'Maybe', 1, 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`AppointmentID`);

--
-- Indizes für die Tabelle `choosedate`
--
ALTER TABLE `choosedate`
  ADD PRIMARY KEY (`choiceDateID`);

--
-- Indizes für die Tabelle `userchoice`
--
ALTER TABLE `userchoice`
  ADD PRIMARY KEY (`userChoiceID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `AppointmentID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `choosedate`
--
ALTER TABLE `choosedate`
  MODIFY `choiceDateID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `userchoice`
--
ALTER TABLE `userchoice`
  MODIFY `userChoiceID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
