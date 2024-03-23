import { Injectable } from '@nestjs/common'
import 'winston-daily-rotate-file'
import * as winston from 'winston'

import { ConsoleLogger } from '@nestjs/common'
@Injectable()
export class LoggerAdapter extends ConsoleLogger {
	winstonLogger: winston.Logger

	info(message: any, context: any) {
		return this.log(message, context)
	}

	log(message: any, context: any) {
		return this.winstonLogger.info(message, context)
	}

	verbose(message: any, context: any) {
		return this.winstonLogger.verbose(message, context)
	}

	warn(message: any, context: any) {
		return this.winstonLogger.warn(message, context)
	}

	debug(message: any, context: any) {
		return this.winstonLogger.debug(message, context)
	}

	error(message: any, context: any) {
		return this.winstonLogger.error(message, context)
	}

	constructor() {
		super()
		this.winstonLogger = winston.createLogger({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.ms(),
				winston.format.colorize(),
				winston.format.align(),
				winston.format.splat(),
				winston.format.printf((info) => {
					return `${info.timestamp} [ ${info.level} ] : ${info.message}`
				})
			),
			transports: [
				new winston.transports.Console(),
				new winston.transports.DailyRotateFile({
					filename: 'logs/hellonestauth-%DATE%.log',
					datePattern: 'YYYY-MM-DD-HH',
					zippedArchive: true,
					maxSize: '20m',
					maxFiles: '14d',
				}),
			],
		})
	}
}
