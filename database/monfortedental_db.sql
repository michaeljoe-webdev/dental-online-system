-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 20, 2024 at 02:55 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `monfortedental_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `dentist_id` int NOT NULL,
  `slot_id` int NOT NULL,
  `appointment_datetime` datetime NOT NULL,
  `duration` int NOT NULL,
  `status` enum('scheduled','cancelled','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `payment_status` enum('paid','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  `insurance_information` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `medical_history` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `symptoms` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dentists`
--

CREATE TABLE `dentists` (
  `dentist_id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `specialization` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `education` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `certifications` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `ratings` decimal(3,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dentists`
--

INSERT INTO `dentists` (`dentist_id`, `name`, `specialization`, `address`, `phone`, `email`, `education`, `certifications`, `experience`, `bio`, `ratings`, `created_at`, `deleted_at`, `updated_at`) VALUES
(1, 'Dr. John Doe', 'Orthodontist', '123 Main Street', '123-456-7890', 'john.doe@monfortedentalclinic.com', 'DDS, University of XYZ', 'Board Certified Orthodontist', 10, 'Dr. John Doe is a skilled orthodontist with a passion for creating beautiful smiles. He believes in personalized treatment plans tailored to each patient\'s unique needs.', 4.80, '2024-05-18 15:11:36', NULL, '2024-05-18 15:11:36'),
(2, 'Dr. Jane Smith', 'Pediatric Dentist', '456 Elm Street', '987-654-3210', 'jane.smith@monfortedentalclinic.com', 'DDS, University of ABC', 'Board Certified Pediatric Dentist', 12, 'Dr. Jane Smith is a dedicated pediatric dentist with a gentle touch and a passion for making dental visits fun and comfortable for children. She is committed to providing the highest quality care and educating families on maintaining healthy smiles.', 4.90, '2024-05-18 15:11:36', NULL, '2024-05-18 15:11:36'),
(3, 'Dr. Mei Chen', 'Oral Surgeon', '789 Maple Avenue', '555-123-4567', 'mei.chen@monfortedentalclinic.com', 'DDS, University of DEF', 'Board Certified Oral Surgeon', 15, 'Dr. Mei Chen is a highly experienced oral surgeon with a meticulous approach to dental surgery. She is known for her expertise in complex extractions and implant placements. Dr. Chen is dedicated to providing compassionate care and ensuring the comfort of her patients.', 4.70, '2024-05-18 15:11:36', NULL, '2024-05-18 15:11:36'),
(4, 'Dr. David Lee', 'Endodontist', '101 Pine Street', '321-654-0987', 'david.lee@monfortedentalclinic.com', 'DDS, University of GHI', 'Board Certified Endodontist', 8, 'Dr. David Lee is a skilled endodontist known for his precision in root canal therapy. He is dedicated to saving teeth and providing pain-free treatments to his patients.', 4.60, '2024-05-18 15:11:36', NULL, '2024-05-18 15:11:36'),
(5, 'Dr. Emma Johnson', 'Periodontist', '202 Oak Street', '123-789-4560', 'emma.johnson@monfortedentalclinic.com', 'DDS, University of JKL', 'Board Certified Periodontist', 11, 'Dr. Emma Johnson specializes in the prevention, diagnosis, and treatment of periodontal disease. She is committed to helping her patients achieve optimal oral health.', 4.80, '2024-05-18 15:11:36', NULL, '2024-05-18 15:11:36'),
(6, 'Dr. Michael Brown', 'Prosthodontist', '303 Birch Lane', '456-123-7890', 'michael.brown@monfortedentalclinic.com', 'DDS, University of MNO', 'Board Certified Prosthodontist', 13, 'Dr. Michael Brown is a talented prosthodontist focused on the restoration and replacement of teeth. He excels in creating custom dentures, crowns, and bridges.', 4.90, '2024-05-18 15:11:36', NULL, '2024-05-18 15:11:36'),
(7, 'Dr. Olivia Martinez', 'General Dentist', '404 Cedar Avenue', '789-123-6540', 'olivia.martinez@monfortedentalclinic.com', 'DDS, University of PQR', 'Board Certified General Dentist', 7, 'Dr. Olivia Martinez is a compassionate general dentist who provides comprehensive dental care for the whole family. She emphasizes preventive care and patient education.', 4.50, '2024-05-18 15:11:36', NULL, '2024-05-18 15:11:36'),
(8, 'Dr. James Wilson', 'Cosmetic Dentist', '505 Elm Street', '654-321-0987', 'james.wilson@monfortedentalclinic.com', 'DDS, University of STU', 'Board Certified Cosmetic Dentist', 10, 'Dr. James Wilson is an expert in cosmetic dentistry, offering services like teeth whitening, veneers, and smile makeovers. He is passionate about enhancing his patients\' smiles and boosting their confidence.', 4.70, '2024-05-18 15:11:36', NULL, '2024-05-18 15:11:36');

-- --------------------------------------------------------

--
-- Table structure for table `slots`
--

CREATE TABLE `slots` (
  `slot_id` int NOT NULL,
  `dentist_id` int NOT NULL,
  `user_id` int NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` enum('available','booked','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `profile_picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `role` enum('admin','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `full_name`, `created_at`, `address`, `phone`, `date_of_birth`, `gender`, `profile_picture`, `last_login`, `role`, `deleted_at`) VALUES
(1, 'admin', '$2b$10$GeUDCYYOhG9gplXgOP1qLuW9FhAlXFQ1HLyTnvEaQVHGo5mNFqU02', 'admin@demo.com', 'Michael Joe Monforte', '2024-05-18 14:09:48', NULL, NULL, NULL, NULL, NULL, NULL, 'user', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `working_days`
--

CREATE TABLE `working_days` (
  `work_id` int NOT NULL,
  `dentist_id` int NOT NULL,
  `sunday` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `monday` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `tuesday` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `wednesday` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `thursday` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `friday` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `saturday` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `time_start` time NOT NULL DEFAULT '08:00:00',
  `time_end` time NOT NULL DEFAULT '17:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `working_days`
--

INSERT INTO `working_days` (`work_id`, `dentist_id`, `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `time_start`, `time_end`) VALUES
(1, 1, '0', '0', '1', '1', '1', '1', '1', '08:00:00', '17:00:00'),
(2, 2, '1', '1', '0', '0', '1', '1', '1', '08:00:00', '17:00:00'),
(3, 3, '1', '1', '1', '1', '0', '0', '1', '08:00:00', '17:00:00'),
(4, 4, '0', '1', '1', '1', '1', '1', '0', '08:00:00', '17:00:00'),
(5, 5, '1', '0', '0', '1', '1', '1', '1', '08:00:00', '17:00:00'),
(6, 6, '1', '1', '1', '0', '1', '1', '0', '08:00:00', '17:00:00'),
(7, 7, '1', '1', '1', '1', '0', '0', '1', '08:00:00', '17:00:00'),
(8, 8, '1', '1', '1', '0', '0', '1', '1', '08:00:00', '17:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD UNIQUE KEY `slot_id_2` (`slot_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `dentist_id` (`dentist_id`),
  ADD KEY `slot_id` (`slot_id`);

--
-- Indexes for table `dentists`
--
ALTER TABLE `dentists`
  ADD PRIMARY KEY (`dentist_id`);

--
-- Indexes for table `slots`
--
ALTER TABLE `slots`
  ADD PRIMARY KEY (`slot_id`),
  ADD KEY `dentist_id` (`dentist_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `working_days`
--
ALTER TABLE `working_days`
  ADD PRIMARY KEY (`work_id`),
  ADD UNIQUE KEY `dentist_id_2` (`dentist_id`),
  ADD KEY `dentist_id` (`dentist_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dentists`
--
ALTER TABLE `dentists`
  MODIFY `dentist_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `slots`
--
ALTER TABLE `slots`
  MODIFY `slot_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `working_days`
--
ALTER TABLE `working_days`
  MODIFY `work_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
