const config = module.exports;
require("dotenv").config();

// Allow aws database
config.aws_services = false;

// Server configurations
config.server = {
  host: "localhost",
  port: 3000,
};

// Local database configurations
config.local_database = {
  host: `localhost`,
  port: `3306`,
  user: `root`,
  password: process.env.PASSWORD,
  database: `personal_notes_manager`,
  multipleStatements: true,
};

// Database configurations
config.aws_database = {
  host: process.env.HOST,
  port: `3306`,
  user: `admin`,
  password: process.env.PASSWORD,
  database: `personal_notes_manager`,
  multipleStatements: true,
};
