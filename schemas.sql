-- ---
-- READ this
-- To run this file on commandlin under roject main directory
--RUN psql shareio
-- create ROLES
--createuser sara --createdb
-- psql -U sara -d shareio -a -f schemas.sql
-- To view database
--\l
--To connect to shareio
--\connect shareio
-- To view tables
--\dt
-- To view contents
-- sqlite> SELECT * FROM listings;
-- ---

-- ---
-- Create database shareio
-- 
-- --- 

--.open shareio
CREATE DATABASE shareio; 

-- ---
-- Table users
-- 
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  ID        SERIAL PRIMARY KEY,
  USERNAME  VARCHAR(255)  NULL ,
  HASH      VARCHAR(255)  NULL ,
  SALT      VARCHAR(255)  NULL 
);
-- --- does the default null work?
-- Table session
-- 
-- ---

DROP TABLE IF EXISTS sessions;
    
CREATE TABLE sessions (
  ID       SERIAL PRIMARY KEY,
  HASH     VARCHAR(255) NULL,
  USERID   INT REFERENCES users (ID)
);

-- ---
-- Table listings
-- 
-- ---

DROP TABLE IF EXISTS listings; 
    
CREATE TABLE listings (
  ID          SERIAL PRIMARY KEY,
  NAME        VARCHAR(255)  NULL,
  DESCRIPTION VARCHAR(500)  NULL,
  COST        INT           NULL,
  TAGS        VARCHAR(255)  NULL,
  LENDERID    INT REFERENCES users (ID)

);

-- ---
-- Table bookings
-- 
-- ---

DROP TABLE IF EXISTS bookings;
    
CREATE TABLE bookings (
  ID         SERIAL PRIMARY KEY,
  LISTINGID  INT REFERENCES listings(ID) NULL,
  BORROWERID INT REFERENCES users(ID) NULL
);

-- -- ---
-- -- Table images
-- -- 
-- -- ---

DROP TABLE IF EXISTS images;
    
CREATE TABLE images (
  ID        SERIAL PRIMARY KEY,
  IMAGENAME VARCHAR(255)  NULL,
  IMAGEPATH VARCHAR(1000)  NULL,
  LISTINGID INT REFERENCES listings(ID) NULL
);


-- -- ---
-- -- INSERT into users table
-- -- 
-- -- ---

INSERT INTO users (username) VALUES (Priyanka);
INSERT INTO users (username) VALUES (Henri);
INSERT INTO users (username) VALUES (Sara);
INSERT INTO users (username) VALUES (Shihao);


-- -- ---
-- -- INSERT into listings table
-- -- 
-- -- ---

INSERT INTO listings (name, description, cost, tags, lenderId) VALUES ('IKEA Table', 'MALM TABLE', 10, 'table, IKEA', 1);
INSERT INTO listings (name, description, cost, tags, lenderId) VALUES ('RED Tent', 'Tent for 4 people', 100, 'Red, tent', 4);
INSERT INTO listings (name, description, cost, tags, lenderId) VALUES ('Tandem Bicycle', 'Tandem Bicycle', 30, 'Tandem Bicycle, 2, sunset', 1);


-- INSERT into bookings table
-- 
-- ---
INSERT INTO bookings (listingId, borrowerId) VALUES (1, 1);

-- -- ---
-- INSERT into images table
-- 
-- ---
INSERT INTO images (imagePath, listingId) VALUES ('./database/images/listingId_1/1.jpg', 1);
INSERT INTO images (imagePath, listingId) VALUES ('./database/images/listingId_1/2.jpg', 1);
INSERT INTO images (imagePath, listingId) VALUES ('./database/images/listingId_2/1.jpg', 2);
INSERT INTO images (imagePath, listingId) VALUES ('./database/images/listingId_3/1.jpg', 3);
INSERT INTO images (imagePath, listingId) VALUES ('./database/images/listingId_3/2.jpg', 3);







