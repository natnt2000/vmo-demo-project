import { createLogger, format, transports } from 'winston'
// import DailyRotateFile from 'winston-daily-rotate-file'

const {
  combine,
  timestamp,
  errors,
  splat,
  json,
  prettyPrint,
  colorize,
  simple,
} = format

const logFormat = combine(
  timestamp({
    format: 'HH:mm:ss DD-MM-YYYY',
  }),
  errors({ stack: true }),
  splat(),
  json(),
  prettyPrint()
)

const logTransport = [
  new transports.Console({
    format: combine(colorize(), simple()),
  }),
  /*
    new DailyRotateFile({
        filename: `./logs/log_%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d',
        level: "info"
    })
    */
  new transports.File({
    filename: './logs/error.log',
  }),
]

const logger = createLogger({
  format: logFormat,
  transports: logTransport,
})

export default logger
