const jwt = require('jsonwebtoken')
require('dotenv').config()

function getAccessToken(username) {
    const user = { name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    return accessToken
}

module.exports = { getAccessToken }