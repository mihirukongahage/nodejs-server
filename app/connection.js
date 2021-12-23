const mysql = require("mysql");
const config = require("./config")

const connection = mysql.createPool(config.database);

connection.getConnection((err) => {
    if(err){
        console.log(`Unable to connect to the database`, err)
    }
    console.log(`Connected to Database`)
})

module.exports = connection;