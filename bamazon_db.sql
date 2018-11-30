DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(255) NULL,
    name VARCHAR(255) NULL,
	price INT NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (id)
);


INSERT INTO products (department_name, name, price, stock_quantity)
VALUES ("Shoes", "Jordan 13 Retro", 220, 100);

INSERT INTO products (department_name, name, price, stock_quantity)
VALUES ("Shoes", "Jordan 11", 230, 100);

INSERT INTO products (department_name, name, price, stock_quantity)
VALUES ("Shoes", "Jordan 7 Retro", 220, 100);