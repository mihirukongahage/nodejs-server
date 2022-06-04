const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({
      filename: "logs/server.log",
      format: format.combine(
        format.timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) =>
            `${info.level.toUpperCase()}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
        format.printf(
          (info) =>
            `${info.level.toUpperCase()}: ${[info.timestamp]} -- ${info.message}`
        )
      ),
    }),
  ],
  rejectionHandlers: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
        format.printf(
          (info) =>
            `${info.level.toUpperCase()}: ${[info.timestamp]} -- ${info.message}`
        )
      ),
    }),
  ],
});

module.exports = logger;
