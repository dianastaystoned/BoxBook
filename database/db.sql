CREATE DATABASE boxbook;
USE boxbook;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(50),
    email VARCHAR(40),
    username VARCHAR(16),
    password VARCHAR(60)
);

CREATE TABLE book(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(100),
	author VARCHAR(100),
	editorial VARCHAR(100),
	genre VARCHAR(100),
	pages VARCHAR(10),
	cover VARCHAR(300),
	progress INT(10)
);