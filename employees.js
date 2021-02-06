const mysql = require("mysql");
const inq = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  mainMenu();
});

function mainMenu(){
  inq
    .prompt([
      {
        type: "list",
        message: "what would you like to do?",
        choices: ["Add Department","Add Role", "Add Employee", "Exit"],
        name: "mainmenu"
      }
    ]).then((data) => {
      switch (data.mainmenu){
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        default:
          console.log("SEE YA NERD");
          break;
      };
    });
};

function addDepartment(){
  inq 
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is your department name?"
      }
    ]).then((data) => {
      let query = `INSERT INTO department (name) VALUES ("${data.department}")`;
      connection.query(query, function(err) {
        if(err) throw (err);
      mainMenu();
    });
  });
};

function addRole(){
  inq
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is your title?"
      }
    ]).then(data => {
      let query = `INSERT INTO role (title, saraly, department_id)`;
    });
};

function addEmployee(){
  console.log("Hello world");
};