-- MySQL dump 10.13  Distrib 9.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: my_project
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','tutor') NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `dob` varchar(20) DEFAULT NULL,
  `subjects` text,
  `profilePhotoName` varchar(255) DEFAULT NULL,
  `profilePhotoData` longblob,
  `background` text,
  `bio` text,
  `pricePerHour` decimal(10,2) DEFAULT NULL,
  `teachingMethod` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `availability` text,
  `lessonSlots` text,
  `reviews` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'shoval kremer','shoval@gmail.com','$2b$10$.5B/8bGB3Pfk9ocZwpuoe.BWzRpxjPYEmkR5SdwIKyBqMq4KPmgci','tutor','0509577215','shoval@gmail.com','1998-05-07','\"[\\\"Math\\\",\\\"Computer Science\\\"]\"','shoval.jpg',NULL,'Shoval holds a Bachelor\'s degree in Industrial Engineering and Management from Tel Aviv University. She has two years of experience teaching mathematics and computer science to high school students. Additionally, Shoval works as a Python instructor in social projects and teaches students data modeling and analysis.','Shoval is a patient and experienced teacher who enjoys delivering knowledge in a simple and clear way. She believes every student can succeed with the right approach and personal support.',120.00,'online','Be\'er sheva','[{\"day\":\"Sunday\",\"date\":\"2025-07-06\",\"time\":\"16:00:00\",\"type\":\"online\"},{\"day\":\"Monday\",\"date\":\"2025-07-07\",\"time\":\"18:00:00\",\"type\":\"in person\"}]','\"[]\"','\"[]\"'),(14,'Noa Glick','noa@gmail.com','$2b$10$506lUW2NmuXhnkhvEPV1GuePLKpB30xrObjz51PIQMiPCX5q.Doym','tutor','0509577211','noa@gmail.com','1999-09-16','\"[\\\"English\\\",\\\"History\\\"]\"','noa.jpg',NULL,'Noa holds a Master\'s degree in Education with a specialization in Learning Technologies. She has three years of experience teaching English to students of all ages, focusing on innovative teaching methods and the use of digital tools.','Noa is an energetic and up-to-date teacher who enjoys encouraging students to build confidence in English and to enjoy the learning process.',100.00,'in person','Tel Aviv','[{\"day\":\"Tuesday\",\"date\":\"2025-07-07\",\"time\":\"16:00:00\",\"type\":\"in person\"},{\"day\":\"Wednesday\",\"date\":\"2025-07-08\",\"time\":\"18:00:00\",\"type\":\"online\"}]','\"[]\"','\"[]\"'),(15,'Amit Wallech','amit@gmail.com','$2b$10$cGQFYO1FqStbEY3iwhj8Ae4YfSvjSjLZAdyL9S.PjeQCu8OXvlrga','tutor','0509577213','amit@gmail.com','1998-03-28','\"[\\\"Science\\\",\\\"Computer Science\\\"]\"','amit.jpg',NULL,'Amit studied Electrical and Electronics Engineering at Ben-Gurion University. He is a certified instructor in programming and systems development courses, experienced in teaching students programming and algorithms.','Amit is a professional and goal-driven teacher who believes in practical and experiential learning. He strives to help students develop technical skills and prepare for real-world challenges.',80.00,'hibride','Haifa','[{\"day\":\"Thursday\",\"date\":\"2025-07-08\",\"time\":\"16:00:00\",\"type\":\"online\"},{\"day\":\"Sunday\",\"date\":\"2025-07-09\",\"time\":\"18:00:00\",\"type\":\"in person\"}]','\"[]\"','\"[]\"');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-06 13:11:40
