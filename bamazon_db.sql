DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products 
(
	id int NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INT(10) NOT NULL,
	PRIMARY KEY (id)
);

-- SELECT * FROM products;