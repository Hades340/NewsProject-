-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2022 at 04:01 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newsblog`
--

-- --------------------------------------------------------

--
-- Table structure for table `binhluan`
--

CREATE TABLE `binhluan` (
  `id` bigint(20) NOT NULL,
  `idBaiViet` bigint(20) DEFAULT NULL,
  `idNguoiDung` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `binhLuan` text DEFAULT NULL,
  `deleteitem` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chitiettintuc`
--

CREATE TABLE `chitiettintuc` (
  `id` bigint(20) NOT NULL,
  `idBaiViet` bigint(20) DEFAULT NULL,
  `chitietbaiviet` text DEFAULT NULL,
  `hinhanh` text DEFAULT NULL,
  `deleteitem` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `loaitintuc`
--

CREATE TABLE `loaitintuc` (
  `id` bigint(20) NOT NULL,
  `loaibaiviet` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `deleteitem` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung`
--

CREATE TABLE `nguoidung` (
  `username` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `ten` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `diachi` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `sdt` double DEFAULT NULL,
  `deleteitem` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `slide`
--

CREATE TABLE `slide` (
  `id` bigint(20) NOT NULL,
  `img` varchar(1000) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tintuc`
--

CREATE TABLE `tintuc` (
  `id` bigint(20) NOT NULL,
  `idloai` bigint(20) DEFAULT NULL,
  `tenbaiviet` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `hinhanh` text DEFAULT NULL,
  `mieuta` text DEFAULT NULL,
  `deleteitem` bit(1) DEFAULT NULL,
  `chitietintuc` text DEFAULT NULL,
  `DateTime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `useradmin`
--

CREATE TABLE `useradmin` (
  `username` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `binhluan`
--
ALTER TABLE `binhluan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idBaiViet` (`idBaiViet`),
  ADD KEY `idNguoiDung` (`idNguoiDung`);

--
-- Indexes for table `chitiettintuc`
--
ALTER TABLE `chitiettintuc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idBaiViet` (`idBaiViet`);

--
-- Indexes for table `loaitintuc`
--
ALTER TABLE `loaitintuc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `slide`
--
ALTER TABLE `slide`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tintuc`
--
ALTER TABLE `tintuc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idloai` (`idloai`);

--
-- Indexes for table `useradmin`
--
ALTER TABLE `useradmin`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chitiettintuc`
--
ALTER TABLE `chitiettintuc`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loaitintuc`
--
ALTER TABLE `loaitintuc`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slide`
--
ALTER TABLE `slide`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tintuc`
--
ALTER TABLE `tintuc`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `binhluan`
--
ALTER TABLE `binhluan`
  ADD CONSTRAINT `binhluan_ibfk_1` FOREIGN KEY (`idBaiViet`) REFERENCES `tintuc` (`id`),
  ADD CONSTRAINT `binhluan_ibfk_2` FOREIGN KEY (`idNguoiDung`) REFERENCES `nguoidung` (`username`);

--
-- Constraints for table `chitiettintuc`
--
ALTER TABLE `chitiettintuc`
  ADD CONSTRAINT `chitiettintuc_ibfk_1` FOREIGN KEY (`idBaiViet`) REFERENCES `tintuc` (`id`);

--
-- Constraints for table `tintuc`
--
ALTER TABLE `tintuc`
  ADD CONSTRAINT `tintuc_ibfk_1` FOREIGN KEY (`idloai`) REFERENCES `loaitintuc` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
