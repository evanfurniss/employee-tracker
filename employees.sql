CREATE database employees_db;

USE employees_db;

CREATE TABLE department (
	id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

SELECT * FROM department;

INSERT INTO department (name) VALUES ("Management");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Accounting");