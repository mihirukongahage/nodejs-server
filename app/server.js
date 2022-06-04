const app = require("./index");
const config = require("./config");
const logger = require('../app/logger/logger');

var server = app.listen(config.server.port, (err) => {
  if (err) {
    log.error("Unable to start the server", error);
  }
  logger.info("Listening to port 3000");
});

server.timeout = 5500;
