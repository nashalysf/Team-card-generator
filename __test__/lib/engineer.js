const Employee = require('./employee');

class Engineer extends Employee {
    constructor(name, ID, email, github) {
        
        super(name, ID, email);

        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }
};

module.exports = Engineer;