const { table } = require('console');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { deprecate } = require('util');
const db = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: 'rootROOT',
		database: 'employees_db'
	},
	console.log(`Connected to the employees_db database.`)
);

function menu() {
	inquirer.prompt([
		{
			name: "action",
			type: "list",
			choices: ["View All Departments",
				"View All Roles",
				"View All Employees",
				"Add a Department",
				"Add a Role",
				"Add an Employee",
				"Update an Employee Role",
				"Quit"
			],
			message: "What action would you like to take?"
		}
	])
		.then(response => {
			if (response.action === "View All Departments") {
				viewDepartments()
			}
			if (response.action === "View All Roles") {
				viewRoles()
			}
			if (response.action === "View All Employees") {
				viewEmployees()
			}
			if (response.action === "Add a Department") {
				addDepartment()
			}
			if (response.action === "Add a Role") {
				addRole()
			}
			if (response.action === "Add an Employee") {
				addEmployee()
			}
			if (response.action === "Update an Employee Role") {
				updateEmployee()
			}
			if (response.action === "Quit") {
				quit()
			}
		})
}

function viewDepartments() {
	db.query("SELECT * FROM department", (err, data) => {
		console.table(data)
		menu()
	})
}

function viewRoles() {
	db.query("SELECT * FROM role", (err, data) => {
		console.table(data)
		menu()
	})
}

function viewEmployees() {
	db.query("SELECT * FROM employee", (err, data) => {
		console.table(data)
		menu()
	})
}

function addDepartment() {
	inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "Enter a department name"
		}
	])
		.then(response => {
			db.query("INSERT INTO department (name) VALUES (?)", [response.name], (err, data) => {
				console.table(data)
				menu()
			})
		})
}

function addRole() {
	db.query("SELECT * FROM department", (err, data) => {
		const departments = data.map(department => ({
			name: department.name,
			value: department.id
		}))
		inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: "Enter a role name"
			},
			{
				type: "input",
				name: "salary",
				message: "Enter the annual salary for this role"
			},
			{
				type: "list",
				name: "id",
				message: "Pick the department for this role",
				choices: departments
			}
		])
			.then(response => {
				db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.name, response.salary, response.id], (err, data) => {
					console.table(data)
					menu()
				})
			})
	})
}

function addEmployee() {
	db.query("SELECT * FROM role", (err, data) => {
		const roles = data.map(role => ({
			name: role.title,
			value: role.id
		}))
		db.query("SELECT * FROM employee", (err, data) => {
			const employees = data.map(employee => ({
				name: employee.first_name + " " + employee.last_name,
				value: employee.id
			}))
			inquirer.prompt([
				{
					type: "input",
					name: "firstname",
					message: "Enter the employee's first name: "
				},
				{
					type: "input",
					name: "lastname",
					message: "Enter the employee's last name: "
				},
				{
					type: "list",
					name: "role",
					message: "Pick the role for this employee",
					choices: roles
				},
				{
					type: "list",
					name: "manager",
					message: "Pick the manager for this employee",
					choices: employees
				}
			])
				.then(response => {
					db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.firstname, response.lastname, response.role, response.manager], (err, data) => {
						console.table(data)
						menu()
					})
				})
		})
	})
}

function updateEmployee() {
	db.query("SELECT * FROM role", (err, data) => {
		const roles = data.map(role => ({
			name: role.title,
			value: role.id
		}))
		db.query("SELECT * FROM employee", (err, data) => {
			const employees = data.map(employee => ({
				name: employee.first_name + " " + employee.last_name,
				value: employee.id
			}))
			inquirer.prompt([
				{
					type: "list",
					name: "employee",
					message: "Which employee do you want to update?",
					choices: employees
				},
				{
					type: "list",
					name: "role",
					message: "Pick a new role for this employee",
					choices: roles
				},
			])
				.then(response => {
					db.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role, response.employee], (err, data) => {
						console.table(data)
						menu()
					})
				})
		})
	})
}
menu();