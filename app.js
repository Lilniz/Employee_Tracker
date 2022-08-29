const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  database: "employee_db",
  user: "root",
  password: "Ifuonlyknewsome1!",
});

const menu_start = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'Action',
            message: 'What would you like to do?',
            choices: [
                'View all Departments',
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add and employee', 
                'Update an employee role',
                'Exit'
            ],
        }
    ])
}