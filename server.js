const mysql = require('mysql2');
const inquirer = require('inquirer');
const { createPublicKey } = require('crypto');
const { exit } = require('process');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    // TODO: Add MySQL Password
    password: 'SUPINFO.2016!',
    database: 'employeetracker_db'
  },
  console.log(`Connected to the employeetracker_db database.`)
);

function checkInfo(){
  inquirer.prompt({
    name: 'info',
    type: 'list',
    message: 'What would you like to check?',
    choices: [
      'See departments',
      'See employees',
      'See roles',
      'Add department',
      'Add employee',
      'Add role',
      'All done!'
    ]
  })
  .then (
    function(pick){
      if (pick.info === 'See departments'){
        seeDepartments();
      } else if (pick.info === 'See employees'){
        seeEmployees();
      } else if (pick.info === 'See roles'){
        seeRoles();
      } else if (pick.info === 'Add department'){
        addDepartment();
      } else if (pick.info === 'Add employee'){
        addEmployee();
      } else if (pick.info === 'Add role'){
        addRole();
      } else if (pick.info === 'Update an employee\'s role'){
        updateEmployeeRole();
      } else if (pick.info === 'All done!'){
        exit
      }
    
    },
  )

};


function seeDepartments() {
  db.query((`SELECT * FROM departments`),(err,deps)=>{
    if (err){
      console.log(err)
    } console.table(deps)
  })
  backToMenu();
};

function seeRoles() {
  db.query((`SELECT * FROM roles`),(err,rol)=>{
    if (err){
      console.log(err)
    } console.table(rol)
  })
  backToMenu();
};

function seeEmployees() {
  db.query((`SELECT * FROM employees`),(err,emp)=>{
    if (err){
      console.log(err)
    } console.table(emp)
  })
  backToMenu();
};

function addDepartment(){
  inquirer.prompt({
    name: 'department_name',
    type: 'input',
    message: 'What department would you like to add?'
  })
  .then(
    function(depname){
      const sql = `INSERT INTO departments (department_name) VALUES (?)`;
      const params = depname.department_name;
      db.query(sql, params, (err,depadd)=>{
        if (err){
          console.log(err)
        } console.log("New department successfully added!")
        return depadd;
      });
      backToMenu();
    })
};

function addEmployee(){
  const sql = 'SELECT * FROM roles';
  db.query(sql, (currentRoles) => {
    currentRoles = currentRoles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
  console.log('Let\'s add an employee!');
  inquirer.prompt({
    name: 'employee_firstname',
    type: 'input',
    message: 'What is the employee\'s first name?'
  },
  {
    name: 'employee_lastname',
    type: 'input',
    message: 'What is the employee\'s last name?'
  },
  {
    name: 'role_id',
    type: 'list',
    message: 'What will their role be?',
    options: currentRoles
  },
  {
    name: 'manager_id',
    type: 'list',
    message: 'select a manager id...',
    choices: [1],
  }
  )
  .then(
    function(newemp){
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)`;
      const params = [newemp.employee_firstname, newemp.employee_lastname, newemp];
      console.log(params);
      db.query(sql, params, (err,empadd)=>{
        if (err){
          console.log(err)
        } console.log("New employee successfully added!")
        return empadd;
      });
      backToMenu();
    })
})};

function addRole(){
  const sql = `SELECT * FROM departments`;
  db.query(sql, (currentDepartments) => {
    currentDepartments = currentDepartments.map((departments) => {
      return {
        name: departments.department_name,
        value: departments.id,
      };
    });
  inquirer.prompt([
    {
    name: 'title',
    type: 'input',
    message: 'What role would you like to add?'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is this role\'s salary?',
    },
    {
      name: 'department_id',
          type: 'list',
          message: 'What department would this role fit into?',
          choices: currentDepartments,
    }
  ])
  .then(
    function(rolname){
      const sql = `INSERT INTO roles (role_title, role_salary, role_department_id) VALUES (?)`;
      const params = rolname.role_title;
      db.query(sql, params, (err,roladd)=>{
        if (err){
          console.log(err)
        } console.log("New role successfully added!")
        return roladd;
      });
      backToMenu();
    })
  })
};

function updateEmployeeRole(){
  db.query('SELECT * FROM employees', (currentEmployees) => {
    currentEmployees = currentEmployees.map((employees) => {
      return {
        name: `${employees.first_name} ${employees.last_name}`,
        value: employees.id,
      };
    });
  db.query('SELECT * FROM roles', (currentRoles) => {
    currentRoles = currentRoles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
  inquirer.prompt({
    name: 'role_name',
    type: 'input',
    message: 'what role would you like to add?'
  })
  .then(
    function(rolname){
      const sql = `INSERT INTO roles (role_name) VALUES (?)`;
      const params = rolname.role_name;
      db.query(sql, params, (err,roladd)=>{
        if (err){
          console.log(err)
        } console.log("New role successfully added!")
        return roladd;
      });
      backToMenu();
      })
    })
  })
};

function backToMenu(){
  setTimeout(() => {
    // inquirer prompt goes here
    inquirer.prompt({
      name: 'continue',
      message: 'Press enter to return to the main menu',
    })
    .then (
      function(event){
        if (event.continue == ''){
          checkInfo();
        }
      },
    )
  }, "3000")
}

checkInfo();