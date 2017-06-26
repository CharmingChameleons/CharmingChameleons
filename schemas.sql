-- ---
-- Table 'user'
-- 
-- ---

DROP TABLE IF EXISTS `user`;
		
CREATE TABLE `user` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
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
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `hash` VARCHAR DEFAULT 'NULL',
  `id_user` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
);

-- ---
-- Table 'listing'
-- 
-- ---

DROP TABLE IF EXISTS `listings`;
		
CREATE TABLE `listings` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT 'NULL',
  `description` VARCHAR(500) DEFAULT 'NULL',
  `cost` INTEGER DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
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
  `id` INTEGER NULL AUTO_INCREMENT,
  `listingId` INTEGER DEFAULT NULL,
  `borrowerId` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listingId`) REFERENCES `listings` (`id`),
  FOREIGN KEY (`borrowerId`) REFERENCES `user` (`id`)
);