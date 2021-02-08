USE employees_db;

INSERT INTO department (name) VALUES ("Management");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("IT");
INSERT INTO department (name) VALUES ("Human Resources");
INSERT INTO department (name) VALUES ("Research and Development");

INSERT INTO role (title, salary) VALUES ("General Manager",80000);
INSERT INTO role (title, salary) VALUES ("Lead Marketing Analyst",75000);
INSERT INTO role (title, salary) VALUES ("Sales Lead",50000);
INSERT INTO role (title, salary) VALUES ("Lead Accountant",60000);
INSERT INTO role (title, salary) VALUES ("Lead Developer",120000);
INSERT INTO role (title, salary) VALUES ("Human Resources Manager",60000);
INSERT INTO role (title, salary) VALUES ("Quarbity Something",60000);
INSERT INTO role (title, salary) VALUES ("Sales Person",40000);
INSERT INTO role (title, salary) VALUES ("Accountant",50000);
INSERT INTO role (title, salary) VALUES ("Junior Developer",65000);
INSERT INTO role (title, salary) VALUES ("Senior Developer",100000);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Michael","Scott",1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Kelly","Kapoor",2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Dwight","Schrute",3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Angela","Martin",4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Nick","Something",5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Holly","Flax",6);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Creed","Bratton",7);