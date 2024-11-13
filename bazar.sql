-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2024 at 08:17 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bazar`
--

-- --------------------------------------------------------

--
-- Table structure for table `catalog`
--

CREATE TABLE `catalog` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT 0,
  `price` decimal(10,2) NOT NULL,
  `topic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `catalog`
--

INSERT INTO `catalog` (`id`, `title`, `quantity`, `price`, `topic`) VALUES
(1, 'How to get a good grade in DOS in 40 minutes a day', 27, 30.00, 'distributed systems'),
(2, 'RPCs for Noobs', 8, 30.00, 'distributed systems'),
(3, 'Xen and the Art of Surviving Undergraduate School', 3, 25.00, 'undergraduate school'),
(4, 'Cooking for the Impatient Undergrad', 7, 15.00, 'undergraduate school'),
(5, 'Surviving College with Minimal Effort', 3, 20.00, 'college survival'),
(6, 'The Undergrad’s Guide to Quick Meals', 7, 18.00, 'college cooking');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `catalog`
--
ALTER TABLE `catalog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
