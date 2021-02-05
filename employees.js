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
        choices: ["Add Department","Add Role", "Add Employee"],
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
      };
    });
};

function addDepartment(){
  console.log("Hello world");
};

function addRole(){
  console.log("Hello world");
};

function addEmployee(){
  console.log("Hello world");
};