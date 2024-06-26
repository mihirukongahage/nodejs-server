const mysql = require("mysql");
const config = require("./config");
const logger = require("../app/logger/logger");

const connection =
  config.aws_services === true
    ? mysql.createPool(config.aws_database)
    : mysql.createPool(config.local_database);

connection.getConnection((err) => {
  if (err) {
    logger.info(`Unable to connect to the database`, err);
  }

  config.aws_services === true
    ? logger.info(`Connected to AWS database`)
    : logger.info(`Connected to local database`);

  // create tables
  let query = `CREATE TABLE IF NOT EXISTS notes (
                note_id INT NOT NULL AUTO_INCREMENT, 
                user_id INT NOT NULL, 
                note VARCHAR(255),
                PRIMARY KEY(note_id));

                CREATE TABLE IF NOT EXISTS user (
                id INT NOT NULL AUTO_INCREMENT, 
                username VARCHAR(255),
                password VARCHAR(255),
                email VARCHAR(255),
                PRIMARY KEY(id));`;

  connection.query(query, function (err, result) {
    if (err) throw err;
    logger.info(`notes and user tables created`);
  });
});

module.exports = connection;
