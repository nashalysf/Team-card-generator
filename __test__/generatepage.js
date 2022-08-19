module.exports = answers => {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Team Profile</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe&family=Cormorant+SC:wght@300;400&family=Roboto:wght@100;300;400&family=Square+Peg&family=Uchen&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav class="navbar"><h1>My Team</h1></nav>
        <section class="profile-wrapper">
          <div class="profile-card">
            <div class="upperCard">
              <div class="Name"><h3>${answers.name}</h3></div>
              <div class="position"><img src="../img/coffee.png" width="35px"/><h3>${answers.position}</h3></div>
            </div>
            <div class="userInfo">
              <div class="ID"><span>ID:</span> ${answers.ID}</div>
              <div class="email"><a href=""><span>Email: </span> ${answers.email}</a></div>
              <div class="office"><span>Office number:</span> ${answers.office-number}</div>
            </div>
            </div>
          
        </section>
      </body>
    </html>
    `
}
