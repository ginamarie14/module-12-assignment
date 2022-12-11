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
  
  // console.log('Press any key to return to main menu');
  // process.stdin.once('data', function () {
  //   checkInfo();
  // });
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
      const sql = `INSERT INTO employees (first_name, last_name) VALUES (?)`;
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
  inquirer.prompt({
    name: 'employee_name',
    type: 'input',
    message: 'Which employee would you like to add?'
  })
  .then(
    function(empname){
      const sql = `INSERT INTO departments (department_name) VALUES (?)`;
      const params = empname.employee_name;
      //console.log(params);
      db.query(sql, params, (err,empadd)=>{
        if (err){
          console.log(err)
        } console.log("New employee successfully added!")
        return empadd;
      });
      backToMenu();
    })
};

function addRole(){
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