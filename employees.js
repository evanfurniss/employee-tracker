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
        name: "mainmenu",
        type: "list",
        message: "what would you like to do?",
        choices: ["View Departments","View Roles","View Employees","Update Employee","Add Department","Add Role","Add Employee","Exit"]
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
        case "Update Employee":
          updateEmployee();
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

function viewDepartments(){
  connection.query("SELECT * FROM department", function(err, res){
    if (err) throw (err);
  console.table(res);
  mainMenu();
  });
};

function viewRoles(){
  connection.query("SELECT * FROM role", function(err, res){
    if (err) throw (err);
  console.table(res);
  mainMenu();
  });
};

function viewEmployees(){
  let managers = getManagerNames();
  connection.query("SELECT * FROM employee", function(err, res){
    if (err) throw (err);
  console.table(res);
  mainMenu();
  })
};

function updateEmployee(){
  inq
    .prompt([
      {
        name: "employee_name",
        type: "list",
        message: "Which employee would you like to update?",
        choices: getEmployees()
      },
      {
        name: "role_id",
        type: "list",
        message: "What is their new role?",
        choices: getRoleIDs()
      }
    ]).then((data) => {
      let roleID = parseInt(data.role_id);
      connection.query(`UPDATE employee SET WHERE ?`, {role_id:`${roleID}`},function(err, res){
        if (err) throw (err);
        mainMenu();
      });
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
        name: "title",
        type: "input",
        message: "What is your title?"
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
      let query = `INSERT INTO role (title, salary, department_id) VALUES("${data.title}", "${data.salary}", "${departmentID}")`;
      connection.query(query, function (err){
        if (err) throw (err);
      });
    });
};

function addEmployee(){
  inq
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter employee's first name"        
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter employee's last name"
      },
      {
        name: "role_id",
        type: "list",
        message: "Select employee's role",
        choices: getRoleIDs()
      },
      {
        name: "manager_id",
        type: "list",
        message: "Please select your manager",
        choices: getEmployees()
      }
    ]).then(data => {
      let roleID = parseInt(data.role_id);
      let managerID = parseInt(data.manager_id)
      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", ${roleID}, ${managerID})`, function(err, res){
        if (err) throw (err);
        mainMenu();
      });
    });
};

function getDepartmentIDs(){
  let choiceArr = [];
  connection.query("SELECT * FROM department", function(err, res){
    if (err) throw (err);
    for(let i = 0; i < res.length; i++){
      choiceArr.push(`${res[i].id} ${res[i].name}`);
    };
  });
  return choiceArr;
};

function getRoleIDs(){
  let choiceArr = [];
  connection.query("SELECT role.id, role.title FROM role", function(err, res){
    if (err) throw (err);
    for (let i =0; i < res.length; i++){
      choiceArr.push(`${res[i].id} ${res[i].title}`);
    };
  });
  return choiceArr;
}

function getEmployees(){
  let choiceArr = [];
  connection.query("SELECT * FROM employee", function(err, res){
    if (err) throw (err);
    for (let i = 0; i < res.length; i++){
      choiceArr.push(`${res[i].id} ${res[i].first_name} ${res[i].last_name}`);
    };
  });
  return choiceArr;
};

function getManagerNames(){
  let managersArr = [];
  connection.query("SELECT * FROM employee", function(err, res){
    if (err) throw (err);
    for (let i = 0; i < res.length; i++) {
      if (res[i].manager_id === "null"){
        managersArr.push(res[i]);
      };
    };
  });
  return managersArr;
}