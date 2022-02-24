CREATE DATABASE boxbook;
USE boxbook;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(50),
    email VARCHAR(40),
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
	user_id INT(11),
	CONSTRAINT fk_user FOREIGN KEY (user_id) references users(id)
);

CREATE TABLE addprogress(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	book_id INT(11),
	CONSTRAINT fk_book FOREIGN KEY (book_id) references book(id),
	progress INT(10),
	review VARCHAR(6000),
	score INT(3),
	status VARCHAR(100),
	user_id INT(11),
	CONSTRAINT fk_iduser FOREIGN KEY (user_id) REFERENCES users(id)
);
