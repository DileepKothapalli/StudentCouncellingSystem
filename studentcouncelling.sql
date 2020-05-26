-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2020 at 12:55 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentcouncelling`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Councelling` int(11) NOT NULL,
  `Allotment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Councelling`, `Allotment`) VALUES
(0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `institutes`
--

CREATE TABLE `institutes` (
  `ID` int(11) NOT NULL,
  `INSTITUTE` text NOT NULL,
  `COURSE` text NOT NULL,
  `PREFERENCE` int(11) NOT NULL,
  `COUNT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `institutes`
--

INSERT INTO `institutes` (`ID`, `INSTITUTE`, `COURSE`, `PREFERENCE`, `COUNT`) VALUES
(1, ' Indian Institute of technology Bombay', ' Computer Science and engineering', 0, 0),
(2, ' Indian Institute of technology Bombay', ' Electronic Communication engineering', 0, 0),
(3, ' Indian Institute of technology Madras', ' Computer Science and engineering', 0, 0),
(4, ' Indian Institute of technology Madras', ' Electronic Communication engineering', 0, 0),
(5, ' Indian Institute of technology Delhi', ' Computer Science and engineering', 0, 0),
(6, ' Indian Institute of technology Delhi', ' Electronic Communication engineering', 0, 0),
(7, ' Indian Institute of technology Kharagpur', ' Computer Science and engineering', 0, 0),
(8, ' Indian Institute of technology Kharagpur', ' Electronic Communication engineering', 0, 0),
(9, ' Indian Institute of technology Kanpur', ' Computer Science and engineering', 0, 0),
(10, ' Indian Institute of technology Kanpur', ' Electronic Communication engineering', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ranklist`
--

CREATE TABLE `ranklist` (
  `Rollnumber` text NOT NULL,
  `Rank` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ranklist`
--

INSERT INTO `ranklist` (`Rollnumber`, `Rank`) VALUES
('18SE11111', 1),
('18SE11112', 2),
('18SE11113', 3),
('18SE11114', 4),
('18SE11115', 5),
('18SE11116', 6),
('18SE11117', 7),
('18SE11118', 8),
('18SE11119', 9),
('18SE11120', 10),
('18SE11121', 11),
('18SE11122', 12),
('18SE11123', 13),
('18SE11124', 14),
('18SE11125', 15),
('18SE11126', 16),
('18SE11127', 17),
('18SE11128', 18),
('18SE11129', 19),
('18SE11130', 20);

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `ID` int(11) NOT NULL,
  `Institute` text NOT NULL,
  `Course` text NOT NULL,
  `Seats` int(11) NOT NULL,
  `Filledseats` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`ID`, `Institute`, `Course`, `Seats`, `Filledseats`) VALUES
(1, 'Indian Institute of technology Bombay', 'Computer Science and engineering', 2, 0),
(2, 'Indian Institute of technology Bombay', 'Electronic Communication engineering', 2, 0),
(3, 'Indian Institute of technology Madras', 'Computer Science and engineering', 2, 0),
(4, 'Indian Institute of technology Madras', 'Electronic Communication engineering', 2, 0),
(5, 'Indian Institute of technology Delhi', 'Computer Science and engineering', 2, 0),
(6, 'Indian Institute of technology Delhi', 'Electronic Communication engineering', 2, 0),
(7, 'Indian Institute of technology Kharagpur', 'Computer Science and engineering', 2, 0),
(8, 'Indian Institute of technology Kharagpur', 'Electronic Communication engineering', 2, 0),
(9, 'Indian Institute of technology Kanpur', 'Computer Science and engineering', 2, 0),
(10, 'Indian Institute of technology Kanpur', 'Electronic Communication engineering', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `Username` text NOT NULL,
  `Password` text NOT NULL,
  `Email` text NOT NULL,
  `Fullname` text NOT NULL,
  `Rollnumber` text NOT NULL,
  `Contact` bigint(100) NOT NULL,
  `Rank` int(11) NOT NULL,
  `institute` text NOT NULL,
  `course` text NOT NULL,
  `choice` int(11) NOT NULL,
  `lockchoice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
