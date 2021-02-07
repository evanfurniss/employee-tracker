const inq = require("inquirer");
const mysql = require("mysql");

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
        choices: ["View Departments","View Roles","View Employees","Add Department","Add Role", "Add Employee", "Exit"],
        name: "mainmenu"
      }
    ]).then((data) => {
      switch (data.mainmenu){
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
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

function viewDepartments(...data){
  connection.query("SELECT * FROM department", function(err, res){
    if (err) throw (err);
  console.table(res);
  mainMenu();
  });
};

function viewRoles(...data){
  connection.query("SELECT * FROM role", function(err, res){
    if (err) throw (err);
  console.table(res);
  mainMenu();
  })
};

function viewEmployees(...data){
  console.log("hello world");
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
  connection.query("SELECT * FROM role", function(err, res){
  if (err) throw(err);
  inq
    .prompt([
      {
        type: "list",
        name: "title",
        message: "What is your title?",
        choices: function(){
          let choiceArr = [];
          for (let i = 0; i < res.length; i++){
            choiceArr.push(res[i].title)
          };
          choiceArr.push("Add new title");
          return choiceArr;
        }
      },
      {
        name: "salary",
        type: "number",
        message: "Please enter your salary"
      },
      {
        name: "department_id",
        type: "list",
        message: "Select the department you work for",
        choices: getDepartmentIDs()
      }
    ]).then(data => {
      let departmentID = parseInt(data.department_id);
      console.log(departmentID);
      let query = `INSERT INTO role (title, salary, department_id) VALUES("${data.title}", "${data.salary}", "${departmentID}")`;
      connection.query(query, function (err){
        if (err) throw (err);
      });
    });
  });
};

function addEmployee(){
  console.log("Hello world");
};

function getDepartmentIDs(){
  var choiceArr = [];
  connection.query("SELECT * FROM department", function(err, res){
    if (err) throw (err);
    for(let i = 0; i < res.length; i++){
      choiceArr.push(`${res[i].id} ${res[i].name}`);
    };
  });
  return choiceArr;
};

// ["1 Management","2 Marketing","3 Sales","4 Accounting","5 IT","6 Human Resources","7 Research and Development"]