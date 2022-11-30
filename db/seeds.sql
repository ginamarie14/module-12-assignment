INSERT INTO departments(department_name)
VALUES ("Finance"), ("Human Resources"), ("Sales"),("Insurance");

INSERT INTO roles(title, salary, department_id)
VALUES ("Salesman", 10000, 3), ("HR Manager", 210000, 2), ("Insurance Representative", 60000, 4), ("F&I Guy", 250000, 1);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Sally", "Carlson", 2, NULL),("John", "Tillerson", 1, NULL), ("Lawrence", "Smith", 4, NULL),("Candice", "Polly", 3, NULL), ("Matilda", "Honey", 1, NULL);