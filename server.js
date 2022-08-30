const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    database: "employee_db",
    user: "root",
    password: "Ifuonlyknewsome1!",
});

connection.connect(err => {
    if (err) throw err;
    console.log("Starting the 3B's Employee Tracker.");
    menu_start();
})

const menu_start = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'Action',
            message: 'What would you like to do?',
            choices: [
                'View all Departments',
                'View all Roles',
                'View all Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Exit'
            ],
        }
    ]).then(response => {
        switch (response.Action) {
            case 'View all Departments':
                viewDepartment();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'View all Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployee();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                connection.resume();
        }
    })
};

const viewDepartment = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res)
        menu_start()
    })
};

const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res)
        menu_start()
    })
};

const viewEmployees = () => {
    connection.query(
        'SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN role ON department.id = role.department_id) JOIN employee ON role.id = employee.role_id);', (err, res) => {
            if (err) throw err;
            console.table(res)
            menu_start()
        })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'Type Department name.'
        }
    ]).then(answer => {
        connection.query(
            'INSERT INTO department (dept_name) VALUES (?)',
            [answer.department],
            (err, res) => {
                if (err) throw err;
                console.log('Dept. Added.')
                menu_start();
            }
        )
    })
}

const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the role salary?'
        },
        {
            name: "Dept_ID",
            type: 'input',
            message: 'What is the department ID?'
        }
    ]).then(answer => {
        connection.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [answer.title, answer.salary, answer.Dept_ID],
            (err, res) => {
                if (err) throw err;
                console.log('Role Added.')
                menu_start();
            }
        )
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is their first name?'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is their last name?'
        },
        {
            name: 'roleID',
            type: 'input',
            message: 'What is their role ID?'
        },
        {
            name: 'managerID',
            type: 'input',
            message: 'What is their manager ID?'
        }
    ]).then(answer => {
        connection.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
            (err, res) => {
                if (err) throw err;
                console.log('Employee Added.')
                menu_start();
            }
        )
    })
}

const updateEmployee = () => {
    inquirer.prompt([
        {
            name: 'nameID',
            type: 'input',
            message: 'Enter employee ID.'
        },
        {
            name: 'roleID',
            type: 'input',
            message: 'Enter new role ID.'
        }
    ]).then(answer => {
        connection.query(
            'UPDATE employee SET role_id=? WHERE id=?',
            [answer.roleID, answer.nameID],
            (err, res) => {
                if (err) throw err;
                console.log('Employee updated.')
                menu_start();
            }
        )
    })
}