const express = require('express')
const bodyParser = require('body-parser')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json');

const { graphqlHTTP } = require("express-graphql")
const schema = require('./graphql/schema')

const app = express()
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', require('./notes/note'))
app.use('/api', require('./uploads/upload'))
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))


// Error handling
app.use((error, req, res, next) => {
    return res.status(500).json({ error: error.toString() });
  });

// Invalid paths
app.get('*', (req, res, next) => {
    res.status(404).send(`Invalid backend endpoint`);
  });

module.exports = app
