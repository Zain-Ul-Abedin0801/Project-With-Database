CREATE DATABASE bookstore;

USE bookstore;

CREATE TABLE Cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    bookId INT NOT NULL,
    quantity INT NOT NULL
);
