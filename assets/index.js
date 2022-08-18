// packages needed for this application
const inquirer = require("inquirer");
const fs = require('fs');
// const writeToFile = require("./src/generateMarkdown");
const generatePage = require('./src/page-template');
//
// const userInput = process.argv.slice(2, process.argv.length);
// const [title, data] = userInput;
// const printInputData = (readDataArgs) => {
//   readDataArgs.forEach((promptResponse) => console.log(promptResponse));
// };

// array of questions for user input
const promptUser = () => {
  return inquirer.prompt([
    { 
        type: "list",
        name: "position",
        message: "Which is the employee's position?",
        choices: [
          "Manager",
          "Engineer",
          "Intern",
        ],
        // when: ({position})=>{
        //     if(position === Manager){
        //       return true;
        //     } else{
        //       return false;
        //     }
        //   }
      },
    {
      type: "input",
      name: "id",
      message: "Enter employee ID:",
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log("Please enter ID number");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "contact",
      message: "Enter employee email:",
      validate: nameInput => {
        if(nameInput){
          return true;
        } else {
          console.log("Please enter email");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "office",
      message: "Enter office number:",
      validate: nameInput => {
        if(nameInput){
          return true;
        } else {
          console.log("Please enter office number");
          return false;
        }
      }
    },
    
    {
      type: "confirm",
      name: "confirmAddEmployee",
      message: "Would you like to enter another employee?",
      default: false,
      when: (confirm)=>{
        if(confirm){
          return true;
          promptUser();
        } else{
          return false;
        }
      }
    },
   
  ]);
};

promptUser().then((answers)=> {
  const HTML = generatePage(answers);
 fs.writeFile("index.html", HTML,(err) => {
    if (err) throw err;
    console.log('HTML page has been created. Check it out!');
  });
 });

// printInputData(userInput);