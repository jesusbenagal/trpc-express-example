import { createLogger, format, transports, Logger as WinstonLogger } from 'winston'

export class Logger {
  private logger: WinstonLogger

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf((info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
      ),
      transports: [new transports.Console()]
    })
  }

  public info(message: string): void {
    this.logger.info(message)
  }

  public warn(message: string): void {
    this.logger.warn(message)
  }

  public error(message: string): void {
    this.logger.error(message)
  }

  public debug(message: string): void {
    this.logger.debug(message)
  }
}
