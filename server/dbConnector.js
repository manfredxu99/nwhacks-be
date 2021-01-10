const mysql = require('mysql');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || '34.105.100.74';

const port = process.env.DB_PORT || '3306';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'sa';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'powerbird342';

// Get the Password for DB from Environment or use default
const database = process.env.DB_PASS || 'nwhacks2021';

// Create the connection with required details
const connection = mysql.createConnection({
  host, port, user, password, database
});
 
// exports.connect = function(app) {
//     // make to connection to the database.
//     con.connect(function(err) {
//     if (err) throw err;
//     // if connection is successful:
//     console.log('connection succeeded!');
//     dbRouter.registerRoutes(app)
// });
// }

module.exports = async () => new Promise(
    (resolve, reject) => {
      connection.connect(error => {
          if (error) {
            console.log("Unable to connect to db: ", error)
          reject(error);
          return;
        }
        console.log("Successfully connected to db!")
        resolve(connection);
    })
});