DROP DATABASE IF EXISTS QA;

CREATE DATABASE QA;

USE QA;

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `question_id` SMALLINT NOT NULL AUTO_INCREMENT,
  `product_id` SMALLINT NOT NULL,
  `question_body` VARCHAR(255) NOT NULL,
  `question_date` DATE DEFAULT CURRENT_DATE,
  `question_name` VARCHAR(20) NOT NULL,
  `question_helpfulness` SMALLINT DEFAULT 0,
  `question_reported` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answers` (
  `question_id` SMALLINT NOT NULL,
  `answer_id` SMALLINT NOT NULL AUTO_INCREMENT,
  `answer_body` VARCHAR(255) NOT NULL,
  `answer_date` DATE DEFAULT CURRENT_DATE,
  `answer_name` VARCHAR(20) NOT NULL,
  `answer_helpfulness` SMALLINT DEFAULT 0,
  PRIMARY KEY (`id`)
  FOREIGN KEY (question_id) REFERENCES `questions` (`id`) ON DELETE CASCADE;
);

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `answer_id` SMALLINT NOT NULL,
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
  FOREIGN KEY (answer_id) REFERENCES `answers` (`id`) ON DELETE CASCADE;
);

