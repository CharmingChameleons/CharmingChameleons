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
CREATE DATABASE henri;

-- ---
-- Table users
--
-- ---

DROP TABLE IF EXISTS users CASCADE;

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

DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
  ID       SERIAL PRIMARY KEY,
  HASH     VARCHAR(255) NULL,
  USERID   INT REFERENCES users (ID)
);

-- ---
-- Table listings
--
-- ---

DROP TABLE IF EXISTS listings CASCADE;

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

DROP TABLE IF EXISTS bookings CASCADE;

CREATE TABLE bookings (
  ID         SERIAL PRIMARY KEY,
  LISTINGID  INT REFERENCES listings(ID) NULL,
  BORROWERID INT REFERENCES users(ID) NULL
);

-- -- ---
-- -- Table images
-- --
-- -- ---



-- -- ---
-- -- INSERT into users table
-- --
-- -- ---

INSERT INTO users (username) VALUES ('Priyanka');
INSERT INTO users (username) VALUES ('Henri');
INSERT INTO users (username) VALUES ('Sara');
INSERT INTO users (username) VALUES ('Shihao');


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
