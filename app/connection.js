const mysql = require("mysql");
const config = require("./config")

const connection = mysql.createPool(config.database);

connection.getConnection((err) => {
    if(err){
        console.log(`Unable to connect to the database`, err)
    }
    console.log(`Connected to Database`)


    // create notes table
    let query = `CREATE TABLE IF NOT EXISTS notes (
                note_id INT NOT NULL AUTO_INCREMENT, 
                user_id INT NOT NULL, 
                note VARCHAR(255),
                PRIMARY KEY(note_id))`

    connection.query(query, function(err, result){
        if (err) throw err;
        console.log("Notes table created");
    })
})

module.exports = connection;