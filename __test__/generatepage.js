
const generateCards = (data) => {
  cardArray = [];
  for (let i = 0; i < data.length; i++) {
    let employee = data[i];
    let role = employee.getRole();

    if (role === "Manager") {
      const managerInfo = generateManager(employee);
      cardArray.push(managerInfo);
    }
    if (role === "Engineer") {
      const engineerInfo = generateEngineer(employee);
      cardArray.push(engineerInfo);
    }
    if (role === "Intern") {
      const internInfo = generateIntern(employee);
      cardArray.push(internInfo);
    }
  }

  const employeeInfo = cardArray.join("");

  const createTeam = generatePage(employeeInfo);
  return createTeam;
};

const generateManager = (manager) => {
  if (!manager) {
    return "";
  }
  return ` <section class="profile-wrapper">
          <div class="profile-card">
            <div class="upperCard">
              <div class="Name"><h3>${manager.name}</h3></div>
                <div class="position"><img src="../img/coffee.png" width="35px"/><h3>${manager.getRole()}</h3></div>
          </div> 
          <div class="userInfo">
            <div class="ID"><span>ID:</span> ${manager.ID}</div>
              <div class="email"><span>Email:</span> <a href="mailto:${manager.email}">${manager.email}</a></div>
                <div class="office"><span>School:</span> ${manager.officeNumber}</div>
          </div>
          </section>
  `;
};

const generateEngineer = (engineer) => {
  if (!engineer) {
    return "";
  }
  return ` <section class="profile-wrapper">
          <div class="profile-card">
            <div class="upperCard">
            <div class="Name"><h3>${engineer.name}</h3></div>
              <div class="position"><img src="../img/engineer.png" width="35px"/><h3>${engineer.getRole()}</h3></div>
          </div>
          <div class="userInfo">
            <div class="ID"><span>GitHub:</span> <a href="https://github.com/${engineer.github}" target="_blank">${engineer.github}</a></div>
              <div class="email"><span>Email:</span> <a href="mailto:${engineer.email}">${engineer.email}</a></div>
            </div>
          </div>
          </section>
  `;
};

const generateIntern = (intern) => {
  if (!intern) {
    return "";
  }
  return ` <section class="profile-wrapper">
          <div class="profile-card">
            <div class="upperCard">
              <div class="Name"><h3>${intern.name}</h3></div>
                <div class="position"><img src="../img/intern.png" width="35px"/><h3>${intern.getRole()}</h3></div>
          </div> 
          <div class="userInfo">
            <div class="ID"><span>ID:</span> ${intern.ID}</div>
            <div class="email"><span>Email:</span> <a href="mailto:${intern.email}">${intern.email}</a></div>
          <div class="office"><span>School:</span> ${intern.school}</div>
          </div>
          </section>
  `;
};

const generatePage = data => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Team Profile</title>
      <link rel="stylesheet" href="assets/style.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe&family=Cormorant+SC:wght@300;400&family=Roboto:wght@100;300;400&family=Square+Peg&family=Uchen&display=swap" rel="stylesheet"/>
    </head>
    <body>
      <nav class="navbar"><h1>My Team</h1></nav>
        <section class="profile-wrapper">
        ${data}
          
      </section>
    </body>
  </html>
  `;
};

module.exports = generateCards;
