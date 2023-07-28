INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1),
       ("Engineer", 90000, 2),
       ("Auditor", 65000, 3),
       ("Accountant", 75000, 3),
       ("Account Manager", 90000, 3),
       ("Legal Team Lead", 100000, 4),
       ("Lawyer", 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 3, NULL),
       ("Jane", "Smith", 2, 1),
       ("Ashley", "Rodriguez", 1, 1),
       ("Tom", "Allen", 4, NULL),
       ("Sarah", "Lourd", 1, 4),
       ("Jim", "Brown", 2, 5),
       ("Kevin", "Tupik", 3, 6);