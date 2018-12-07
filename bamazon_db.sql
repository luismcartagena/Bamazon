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


INSERT INTO products (department_name, name, price, stock_quantity) VALUES 
("Groceries", "Avocado", 1.50, 100),
("Groceries", "Tortillas (12)", 3.00, 60),
("Shoes", "KEEN Hiking Boots", 150.00, 100),
("Camping", "Kelty Monarch Tent", 169.99, 100),
("Outdoors", "OUTAD Traction Cleats", 62.99, 15),
("Socks", "Darn Tough Socks", 24.99, 50),
("Books", "Borderland: The New Mestiza", 18.77, 999),
("Books", "The Elegant Universe", 21.20, 120),
("Electronics", "Nintendo Switch", 299.90, 5),
("Computers", "Macbook Pro 2018", 9999, 1);

-- SELECT * FROM products;