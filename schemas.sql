-- ---
-- READ this
-- To run this file on commandlin under roject main directory
-- RUN command: sqlite3
-- sqlite3> .read schemas.sql
-- To view database
-- sqlite3> .open shareio.db
-- To view tables
-- sqlite3> .tables
-- To view contents
-- sqlite> SELECT * FROM listings;
-- ---

-- ---
-- Create database shareio
-- 
-- ---

.open shareio

-- ---
-- Table 'user'
-- 
-- ---

DROP TABLE IF EXISTS `user`;
    
CREATE TABLE `user` (
  `id` INTEGER AUTO_INCREMENT ,
  `username` VARCHAR(255) DEFAULT 'NULL',
  `hash` VARCHAR(255) DEFAULT 'NULL',
  `salt` VARCHAR DEFAULT 'NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'session'
-- 
-- ---

DROP TABLE IF EXISTS `session`;
    
CREATE TABLE `session` (
  `id` INTEGER AUTO_INCREMENT,
  `hash` VARCHAR DEFAULT 'NULL',
  `userId` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
);

-- ---
-- Table 'listing'
-- 
-- ---

DROP TABLE IF EXISTS `listings`;
    
CREATE TABLE `listings` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT 'NULL',
  `description` VARCHAR(500) DEFAULT 'NULL',
  `cost` INTEGER DEFAULT NULL,
  `tags` VARCHAR DEFAULT 'NULL',
  `lenderId` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (lenderId) REFERENCES `user` (`id`)
);

-- ---
-- Table 'bookings'
-- 
-- ---

DROP TABLE IF EXISTS `bookings`;
    
CREATE TABLE `bookings` (
  `id` INTEGER AUTO_INCREMENT,
  `listingId` INTEGER DEFAULT NULL,
  `borrowerId` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listingId`) REFERENCES `listings` (`id`),
  FOREIGN KEY (`borrowerId`) REFERENCES `user` (`id`)
);

-- ---
-- Table 'images'
-- 
-- ---

DROP TABLE IF EXISTS `images`;
    
CREATE TABLE `images` (
  `id` INTEGER AUTO_INCREMENT,
  `imageName` VARCHAR(255) DEFAULT 'NULL',
  `imagePath` INTEGER DEFAULT NULL,
  `listingId` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listingId`) REFERENCES `listing` (`id`)
);


-- ---
-- INSERT into 'users' table
-- 
-- ---

INSERT INTO `user` (username) VALUES ('priyanka');
INSERT INTO `user` (username) VALUES ('henri');
INSERT INTO `user` (username) VALUES ('sara');
INSERT INTO `user` (username) VALUES ('shihao');

-- ---
-- INSERT into 'listings' table
-- 
-- ---

INSERT INTO `listings` (name, description, cost, tags, lenderId) VALUES ('IKEA Table', 'MALM TABLE', 10, 'table, IKEA', 1);
INSERT INTO `listings` (name, description, cost, tags, lenderId) VALUES ('RED Tent', 'Tent for 4 people', 100, 'Red, tent, 4', 1);
INSERT INTO `listings` (name, description, cost, tags, lenderId) VALUES ('Tandem Bicycle', 'Tandem Bicycle', 30, 'Tandem Bicycle, 2, sunset', 1);

-- ---
-- INSERT into 'bookings' table
-- 
-- ---
INSERT INTO `bookings` (listingId, borrowerId) VALUES (1, 1);

-- ---
-- INSERT into 'images' table
-- 
-- ---
INSERT INTO `images` (imagePath, listingId) VALUES ('./database/images/listingId_1/1.jpg', 1);
INSERT INTO `images` (imagePath, listingId) VALUES ('./database/images/listingId_1/2.jpg', 1);
INSERT INTO `images` (imagePath, listingId) VALUES ('./database/images/listingId_2/1.jpg', 2);
INSERT INTO `images` (imagePath, listingId) VALUES ('./database/images/listingId_3/1.jpg', 3);
INSERT INTO `images` (imagePath, listingId) VALUES ('./database/images/listingId_3/2.jpg', 3);
