const app = require('./index')
const config = require('./config')


app.listen(config.server.port, (err) => {
    if(err) {
        log.error('Unable to start the server', error)
    }
    console.log('Listening to port 3000')
})