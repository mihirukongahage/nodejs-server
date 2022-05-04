const router = require('express').Router()
const auth = require('../tokens/token-service')
const middleware = require('../middleware/middleware')

router.get('/login', (req, res) => {
    const username = req.body.username

    if(username) {
        const accessToken = { accessToken: auth.getAccessToken(username) }
        res.status(200).send(accessToken)
    } else {
        console.log('username not available')
        res.status(400).send('username not available')
    }
})


router.get('/test', middleware.auth, (req, res) => {
    res.send(req.user)
})

module.exports = router