-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 13. Apr 2021 um 12:53
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
  `Datum` datetime NOT NULL,
  `Ablaufdatum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `choosedate`
--

CREATE TABLE `choosedate` (
  `chooseDateID` int(100) NOT NULL,
  `chosenDate` datetime NOT NULL,
  `appointmentsID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `userchoice`
--

CREATE TABLE `userchoice` (
  `userChoiceID` int(100) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `chosenDate` int(100) NOT NULL,
  `comment` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD PRIMARY KEY (`chooseDateID`);

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
  MODIFY `AppointmentID` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `choosedate`
--
ALTER TABLE `choosedate`
  MODIFY `chooseDateID` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `userchoice`
--
ALTER TABLE `userchoice`
  MODIFY `userChoiceID` int(100) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
