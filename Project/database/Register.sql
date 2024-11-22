CREATE DATABASE enchanted;

USE enchanted;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Store hashed passwords
    dateOfBirth DATE NOT NULL,
    country VARCHAR(50) NOT NULL,
    gender ENUM('male', 'female') NOT NULL
);
