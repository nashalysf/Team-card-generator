
const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./__test__/generatePage.js');
const Manager = require('./__test__/lib/manager');
const Engineer = require('./__test__/lib/engineer.js');
const Intern = require('./__test__/lib/intern.js');


const teamArray = [];


const addManager = () => {
	return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter Manager name:',
            validate: nameInput => {
                if (nameInput) {
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
            message: 'Enter Manager e-mail:',
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
            name: 'officeNumber',
            message: "Enter Manager office number:",
            validate: OfficeNumber => {
                if (OfficeNumber) {
                    return true;
                } else {
                    console.log('Please enter an office number!');
                }
            }
        }
    ])
    .then(ManagerInfo => {
        const manager = new Manager (ManagerInfo.name, ManagerInfo.id, ManagerInfo.email, ManagerInfo.officeNumber);
        teamArray.push(Manager);
    })
};

const addEmployee = () => {
	return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Would you like to add a team member?',
            choices: ['Engineer', 'Intern', 'Finish Building Team']
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter employee name:',
            when: (choice) => choice.role !== 'Finish Building Team',
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
            when: (choice) => choice.role !== 'Please Finish Building Team',
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
            when: (choice) => choice.role !== 'Please Finish Building Team',
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
            when: (choice) => choice.role !== 'Please Finish Building Team',
            default: false
        }
    ])
    .then(Employee => {
        if (Employee.role === 'Engineer') {
            const engineer = new Engineer (Employee.name, Employee.id, Employee.email, Employee.github);
            teamArray.push(engineer);
        } else if (Employee.role === 'Intern') {
            const intern = new Intern (Employee.name, Employee.id, Employee.email, Employee.school);
            teamArray.push(intern);
        }

        if (Employee.addEmployee) {
            return addEmployee(teamArray);
        } else {
            return teamArray;
        }
    })
};

// generate index
const createFile = (fileName, teamArray) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileName, err => {
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
// initialize app
addManager()
    .then(Employee => {
        return addEmployee(Employee)
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