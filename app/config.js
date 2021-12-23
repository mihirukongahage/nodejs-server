const config = module.exports
require('dotenv').config()

// Server configurations
config.server = {
    host: 'localhost',
    port: 3000
}

// Database configurations
config.database = {
        host: process.env.ENDPOINT,
        port: process.env.PORT,
        user: `admin`,
        password: process.env.PASSWORD,
        database: `personal_notes_manager`,
}