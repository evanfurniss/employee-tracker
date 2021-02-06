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
      },
      {
        name: "salary",
        type: "number",
        message: "Please enter salary"
      },
      {
        name: "department_id",
        type: "list",
        message: "Select the department you work for",
        choices: ["Sales","Marketing","Management","Accounting"]
      }
    ]).then(data => {
      let departmentID = getDepartmentIDs(data.department_id);
      let query = `INSERT INTO role (title, salary, department_id) VALUES("${data.title}", "${data.salary}", "${departmentID}")`;
      // console.log(departmentID);
      connection.query(query, function (err){
        if (err) throw (err);
      });
    });
};

function addEmployee(){
  console.log("Hello world");
};

function getDepartmentIDs(data){
  switch (data){
    case "Management":
      return 1;
      break;
    case "Marketing":
      return 2;
      break;
    case "Sales":
      return 3;
      break;
    case "Accounting":
      return 4;
      break;
  };
};