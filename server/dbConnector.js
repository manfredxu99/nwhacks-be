const mysql = require('mysql');
require('dotenv').config();

const connectionConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
}

module.exports = async () => new Promise(
    (resolve, reject) => {
      // Create the connection with required details
      const connection = mysql.createConnection(connectionConfig);
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