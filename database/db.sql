CREATE DATABASE IF NOT EXISTS `quasar_tutorial` CHARACTER SET utf8 COLLATE utf8_general_ci;

USE quasar_tutorial;

CREATE TABLE  `users` (
`id` INT AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 100 ) NOT NULL ,
`email` VARCHAR( 100 ) NOT NULL ,
`mobile` VARCHAR( 100 ) NOT NULL
) ENGINE = INNODB;

CREATE TABLE  `books` (
`id` INT AUTO_INCREMENT PRIMARY KEY ,
`title` VARCHAR( 100 ) NOT NULL ,
`description` VARCHAR( 100 ) NOT NULL ,
`author_id` INT NOT NULL
) ENGINE = INNODB;

INSERT INTO users SET name = 'bruno', email = 'bruno@bru.no', mobile = '06.06.06.06.06';

INSERT INTO books SET title = 'livre 1', description = 'ma super description 1', author_id = '1';
