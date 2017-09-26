-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2017 at 05:14 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_server`
--

-- --------------------------------------------------------

--
-- Table structure for table `cntg`
--

CREATE TABLE `cntg` (
  `id` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `gmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fromMove` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `toMove` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `dateMove` date NOT NULL,
  `cost` int(100) NOT NULL,
  `note` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tick` tinyint(1) NOT NULL DEFAULT '0',
  `memberIds` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `cntg`
--

INSERT INTO `cntg` (`id`, `name`, `phone`, `gmail`, `fromMove`, `toMove`, `dateMove`, `cost`, `note`, `time`, `tick`, `memberIds`) VALUES
(2055963589, 'Vũ bgg', '01686891060', 'hoainamak51@gmail.com', 'Hà Nội', 'Thanh Hóa', '2017-07-11', 5000000, 'đến trước 10h sáng', '2017-09-25 22:21:37', 0, '10235648,10235649,10235650'),
(2055963590, 'Le Minh Minh', '01658985563', 'minhvan@gmail.com', 'hà nội ', 'thanh hóa', '0000-00-00', 5000000, 'chuyên gấp ạ !', '2017-09-25 22:19:41', 0, '10235648,10235649,10235650');

-- --------------------------------------------------------

--
-- Table structure for table `cvptg`
--

CREATE TABLE `cvptg` (
  `id` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `gmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fromMove` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `toMove` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `dateMove` date NOT NULL,
  `cost` int(100) NOT NULL,
  `note` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tick` tinyint(1) NOT NULL DEFAULT '0',
  `memberIds` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `cvptg`
--

INSERT INTO `cvptg` (`id`, `name`, `phone`, `gmail`, `fromMove`, `toMove`, `dateMove`, `cost`, `note`, `time`, `tick`, `memberIds`) VALUES
(1011963579, 'Lê Thị Lệ', '01657847014', 'tammao@gmail.com', 'Số 10km Nguyễn trãi Vĩnh yên Vĩnh phúc.', 'so 11 khu nhà A1 phường trung văn Tp Thanh Hóa.', '2017-07-12', 500000, '1 Tủ lạnh \r\n2 kệ tủ \r\n1 tivi \r\n3 thùng quần áo', '2017-08-25 15:01:11', 0, ''),
(1011963580, 'Lê Minh Minh', '016593255452', 'leminhminh124@gmail.com', 'Số 10 Nguyễn xiển Hà Nội.', 'Số 76 Quất Duy Tiến Hà Nội.', '2017-07-27', 1500000, '3 Tủ \r\n2 Thùng Quần áo \r\n2 giường', '2017-08-25 15:01:11', 0, ''),
(1011963581, 'Hà Hữu Cường', '01253558962', 'hacuong1998@gmail.com', 'Số 12 Quất duy tiến Hà Nội ', 'Nông Cống thanh hóa', '2017-07-19', 2000000, '3 Tủ \r\n2 Thùng Quần áo \r\n5 giường', '2017-08-25 15:01:11', 0, ''),
(1011963583, 'Vũ Văn Mao', '01657847014', 'tammao@gmail.com', 'Số 10km Nguyễn trãi Vĩnh yên Vĩnh phúc.', 'so 11 khu nhà A1 phường trung văn Tp Thanh Hóa.', '2017-07-12', 500000, '1 Tủ lạnh \r\n2 kệ tủ \r\n1 tivi \r\n3 thùng quần áo', '2017-08-25 15:01:11', 0, ''),
(1011963585, 'Vũ Thị Lan', '01562585530', 'kimLan@gmail.com', 'Số 10km Nguyễn trãi Vĩnh yên Vĩnh phúc.', 'so 11 khu nhà A1 phường trung văn Tp Thanh Hóa.', '2017-09-16', 500000, '1 Tủ lạnh \r\n2 kệ tủ \r\n1 tivi \r\n3 thùng quần áo', '2017-08-25 15:01:11', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `dvvc`
--

CREATE TABLE `dvvc` (
  `id` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `gmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fromMove` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `toMove` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `dateMove` date NOT NULL,
  `cost` int(100) NOT NULL,
  `note` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tick` tinyint(1) NOT NULL DEFAULT '0',
  `memberIds` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `pictureId` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `level` int(11) NOT NULL,
  `totalApply` int(11) NOT NULL,
  `yearBirth` int(11) NOT NULL,
  `href` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `name`, `avatar`, `phone`, `address`, `pictureId`, `level`, `totalApply`, `yearBirth`, `href`) VALUES
(10235648, 'Vũ Hoài Nam', 'https://pbs.twimg.com/profile_images/831993825635745796/HnVmB0-k_400x400.jpg', '01686891060', 'Thanh Hóa', 'http://media.blogkhoahoc.net/files/elenabui/2016/09/26/trac-nghiem-vui-doan-so-menh-qua-so-chung-minh-thu-nhan-dan-1-blogkhoahocnet-2002.jpg', 1, 2, 1996, 'https://namvh/profile'),
(10235649, 'Hà Hữu Cường', 'http://file.vforum.vn/hinh/2014/5/avatar-facebook-6.jpg', '01684736677', 'Hà Nội', 'https://lh4.googleusercontent.com/-GlKIZXpuqNM/WBYOP2uVj-I/AAAAAAAALsU/cqEjAtM3ggk9xG6m0wtcSps6wcAleq_dQCLcB/s1600/chinh-sua-cmnd-2.png', 3, 10, 1992, 'https://cuonghh/profile'),
(10235652, 'Lan', 'https://pbs.twimg.com/profile_images/831993825635745796/HnVmB0-k_400x400.jpg', '01657847041', 'Thanh hoa', 'http://media.blogkhoahoc.net/files/elenabui/2016/09/26/trac-nghiem-vui-doan-so-menh-qua-so-chung-minh-thu-nhan-dan-1-blogkhoahocnet-2002.jpg', 0, 1, 1978, 'https://Lan/profile');

-- --------------------------------------------------------

--
-- Table structure for table `t_user`
--

CREATE TABLE `t_user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_user`
--

INSERT INTO `t_user` (`user_id`, `name`, `email`, `password`, `time`) VALUES
(89, 'VuHoaiNam', 'hoainamak51@gmail.com', 'vuhoainam', '2017-08-25 14:55:19'),
(90, 'admin', 'hoainamak521996@gmail.com', 'vuhoainam', '2017-08-25 14:55:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cntg`
--
ALTER TABLE `cntg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cvptg`
--
ALTER TABLE `cvptg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dvvc`
--
ALTER TABLE `dvvc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cntg`
--
ALTER TABLE `cntg`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2055963591;
--
-- AUTO_INCREMENT for table `cvptg`
--
ALTER TABLE `cvptg`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1011963586;
--
-- AUTO_INCREMENT for table `dvvc`
--
ALTER TABLE `dvvc`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10235653;
--
-- AUTO_INCREMENT for table `t_user`
--
ALTER TABLE `t_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
