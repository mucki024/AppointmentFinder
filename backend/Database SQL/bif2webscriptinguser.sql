-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 28. Apr 2021 um 21:52
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
  `Beschreibung` varchar(300) NOT NULL,
  `Ort` varchar(100) NOT NULL,
  `Dauer` time NOT NULL,
  `Datum` datetime NOT NULL DEFAULT current_timestamp(),
  `Ablaufdatum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`AppointmentID`, `Titel`, `Beschreibung`, `Ort`, `Dauer`, `Datum`, `Ablaufdatum`) VALUES
(67, 'myAppointment', 'discuss Details about..', 'somewhere', '01:00:00', '2021-04-28 21:02:20', '2021-04-30 15:00:00'),
(69, 'expiredAppointment', 'this cant be edited', 'somewhere', '01:00:00', '2021-04-28 21:39:59', '2021-04-26 20:00:00'),
(70, 'secondAppointment', 'here are more details', 'somewhere', '02:00:00', '2021-04-28 21:42:37', '2021-04-30 20:00:00');

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
(66, '2021-04-30 18:00:00', 2, 67),
(67, '2021-04-30 19:00:00', 0, 67),
(68, '2021-05-01 08:00:00', 1, 67),
(70, '2021-04-28 20:00:00', 2, 69),
(71, '2021-04-28 18:00:00', 0, 69),
(72, '2021-05-01 08:00:00', 0, 70),
(73, '2021-05-01 10:00:00', 0, 70);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `userchoice`
--

CREATE TABLE `userchoice` (
  `userChoiceID` int(100) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `choiceDateID` int(100) NOT NULL,
  `appointmentsID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `userchoice`
--

INSERT INTO `userchoice` (`userChoiceID`, `userName`, `comment`, `choiceDateID`, `appointmentsID`) VALUES
(53, 'martin', '', 66, 67),
(54, 'martin', 'other options?', 68, 67),
(55, 'jonny', 'nice', 66, 67),
(56, 'martin', '', 70, 69),
(57, 'jonny', 'we will see', 70, 69);

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
  MODIFY `AppointmentID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT für Tabelle `choosedate`
--
ALTER TABLE `choosedate`
  MODIFY `choiceDateID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT für Tabelle `userchoice`
--
ALTER TABLE `userchoice`
  MODIFY `userChoiceID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
