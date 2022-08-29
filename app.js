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
    ]).then(response => {
        switch (response.Action) {
            case 'View all departments':
                viewDepartment();
                break;
            case 'View all jobs':
                viewJobs();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a job':
                addJob();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update employee job':
                updateEmployee();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                connection.end();
        }
    })
}