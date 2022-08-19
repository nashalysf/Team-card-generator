
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./__test__/lib/manager');
const Engineer = require('./__test__/lib/engineer.js');
const Intern = require('./__test__/lib/intern.js');
const generatePage = require('./__test__/generatePage.js');


const teamArray = [];


const addManager = () => {
	return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter Manager name:',
            validate: managerName => {
                if (managerName) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                }
            }
        },
        {
            type: 'input',
            name: 'ID',
            message: "Enter Manager ID number:",
            validate: managerID => {
                if (managerID) {
                    return true;
                } else {
                    console.log('Please enter a valid ID number!');
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter Manager e-mail:',
            validate: managerEmail => {
                if (managerEmail) {
                    return true;
                } else {
                    console.log('Please enter an e-mail address!');
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter Manager office number:",
            validate: managerOfficeNumber => {
                if (managerOfficeNumber) {
                    return true;
                } else {
                    console.log('Please enter an office number!');
                }
            }
        }
    ])
    .then(ManagerData => {
        const manager = new Manager (ManagerData.name, ManagerData.ID, ManagerData.email, ManagerData.officeNumber);
        teamArray.push(manager);
    })
};

const addEmployee = () => {
	return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Would you like to add a team member?',
            choices: ['Engineer', 'Intern', 'Finish']
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter employee name:',
            when: (choice) => choice.role !== 'Finish',
            validate: Name => {
                if (Name) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                }
            }
        },
        {
            type: 'input',
            name: 'ID',
            message: "Enter employee ID:",
            when: (choice) => choice.role !== 'Finish',
            validate: ID => {
                if (ID) {
                    return true;
                } else {
                    console.log('Please enter a valid ID number!');
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter employee email:',
            when: (choice) => choice.role !== 'Finish',
            validate: Email => {
                if (Email) {
                    return true;
                } else {
                    console.log('Please enter an e-mail address!');
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter Engineer's GitHub username:",
            when: (choice) => choice.role === 'Engineer',
            validate: github => {
                if (github) {
                    return true;
                } else {
                    console.log('Please enter a GitHub username!');
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter Intern's school:",
            when: (choice) => choice.role === 'Intern',
            validate: school => {
                if (school) {
                    return true;
                } else {
                    console.log('Please enter a school!');
                }
            }
        },
        {
            type: 'confirm',
            name: 'addEmployee',
            message: 'Would you like to add another team member?',
            default: false
        }
    ])
    .then(employeeData => {
        if (employeeData.role === 'Engineer') {
            const engineer = new Engineer (employeeData.name, employeeData.ID, employeeData.email, employeeData.github);
            teamArray.push(engineer);
        } else if (employeeData.role === 'Intern') {
            const intern = new Intern (employeeData.name, employeeData.ID, employeeData.email, employeeData.school);
            teamArray.push(intern);
        }

        if (employeeData.addEmployee) {
            return addEmployee(teamArray);
        } else {
            return teamArray;
        }
    })
};

// generate index
const createFile = (fileName, teamArray) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./index.html', fileName, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Page created! Go check it out!'
            });
        });
    });
};

addManager()
    .then(employeeData => {
        return addEmployee(employeeData)
    })
    .then(data => {
        console.log(data);
        return generatePage(data);
    })
    .then(newFile => {
        return createFile(newFile);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse.message);
    })
    .catch(err => {
        console.log(err);
    });
  