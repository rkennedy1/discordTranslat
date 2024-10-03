const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;

// Define custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Create the logger
const logger = createLogger({
  level: "info", // Set the default log level
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // Log the full stack trace for errors
    logFormat
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to a file
    new transports.File({ filename: "logs/combined.log" }), // Log all messages to a file
  ],
  exceptionHandlers: [
    new transports.File({ filename: "logs/exceptions.log" }), // Log uncaught exceptions to a file
  ],
  rejectionHandlers: [
    new transports.File({ filename: "logs/rejections.log" }), // Log unhandled promise rejections to a file
  ],
});

module.exports = logger;
