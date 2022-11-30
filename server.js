const mysql = require('mysql2');
const inquirer = require('inquirer');

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

function seeDepartments() {
  db.query (`SELECT * FROM departments`)
  console.log("we have departments")
}

function seeRoles() {
  db.query (`SELECT * FROM roles`)
  console.log("we have roles")
}

function seeEmployees() {
  db.query (`SELECT * FROM employees`)
  console.log("we have employees")
}

function addDepartment(){

}

function addEmployee(){
  
}

function addRole(){
  
}

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
      }else if (pick.info === 'See employees'){
        seeEmployees();
      }else if (pick.info === 'See roles'){
        seeRoles();
      }else if (pick.info === 'Add department'){

      }else if (pick.info === 'Add employee'){

      }else if (pick.info === 'Add role'){

      }else if (pick.info === 'All done!'){

      }
    
    }
  )

}