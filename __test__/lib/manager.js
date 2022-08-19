const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, ID, email, officeNumber) {
        // call parent here
        super(name, ID, email);

        this.officeNumber = officeNumber;
    }
    getRole() {
        return 'Manager';
    }
};

module.exports = Manager; 