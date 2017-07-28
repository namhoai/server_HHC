-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2017 at 07:37 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `Id` int(10) NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `Gmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `FromMove` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `ToMove` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `DateMove` date NOT NULL,
  `Cost` int(100) NOT NULL,
  `Note` mediumtext COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`Id`, `Name`, `Phone`, `Gmail`, `FromMove`, `ToMove`, `DateMove`, `Cost`, `Note`) VALUES
(1011963579, 'Lê Thị Lệ', '01657847014', 'tammao@gmail.com', 'Số 10km Nguyễn trãi Vĩnh yên Vĩnh phúc.', 'so 11 khu nhà A1 phường trung văn Tp Thanh Hóa.', '2017-07-12', 500000, '1 Tủ lạnh \r\n2 kệ tủ \r\n1 tivi \r\n3 thùng quần áo'),
(1011963580, 'Lê Minh Minh', '016593255452', 'leminhminh124@gmail.com', 'Số 10 Nguyễn xiển Hà Nội.', 'Số 76 Quất Duy Tiến Hà Nội.', '2017-07-27', 1500000, '3 Tủ \r\n2 Thùng Quần áo \r\n2 giường'),
(1011963581, 'Hà Hữu Cường', '01253558962', 'hacuong1998@gmail.com', 'Số 12 Quất duy tiến Hà Nội ', 'Nông Cống thanh hóa', '2017-07-19', 2000000, '3 Tủ \r\n2 Thùng Quần áo \r\n5 giường'),
(1011963583, 'Vũ Văn Mao', '01657847014', 'tammao@gmail.com', 'Số 10km Nguyễn trãi Vĩnh yên Vĩnh phúc.', 'so 11 khu nhà A1 phường trung văn Tp Thanh Hóa.', '2017-07-12', 500000, '1 Tủ lạnh \r\n2 kệ tủ \r\n1 tivi \r\n3 thùng quần áo'),
(1011963584, 'Vũ Thị Thoa', '01562585530', 'kimthoa@gmail.com', 'Số 10km Nguyễn trãi Vĩnh yên Vĩnh phúc.', 'so 11 khu nhà A1 phường trung văn Tp Thanh Hóa.', '2017-09-16', 500000, '1 Tủ lạnh \r\n2 kệ tủ \r\n1 tivi \r\n3 thùng quần áo'),
(1011963585, 'Vũ Thị Lan', '01562585530', 'kimLan@gmail.com', 'Số 10km Nguyễn trãi Vĩnh yên Vĩnh phúc.', 'so 11 khu nhà A1 phường trung văn Tp Thanh Hóa.', '2017-09-16', 500000, '1 Tủ lạnh \r\n2 kệ tủ \r\n1 tivi \r\n3 thùng quần áo'),
(1011963586, 'Vũ Thị Linh Trang', '01562585530', 'trangkkn@gmail.com', 'Số 10km Nguyễn trãi Vĩnh yên Vĩnh phúc.', 'so 11 khu nhà A1 phường trung văn Tp Thanh Hóa.', '2017-09-16', 5000000, '3 Tủ lạnh \r\n2 kệ tủ \r\n1 tivi \r\n3 thùng quần áo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1011963587;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
