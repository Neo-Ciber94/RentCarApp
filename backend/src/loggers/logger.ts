import winston from "winston";
const { printf } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.cli(),
    winston.format.timestamp(),
    winston.format.ms(),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});
