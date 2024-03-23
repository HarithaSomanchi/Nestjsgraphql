import { Catch } from '@nestjs/common'
import { HttpStatus } from '@nestjs/common'
import { HttpException } from '@nestjs/common'
import { ArgumentsHost } from '@nestjs/common'

import { HttpAdapterHost } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { ExceptionFilter } from '@nestjs/common'
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	readonly logger: Logger = new Logger(this.constructor.name)

	catch(exception: HttpException, host: ArgumentsHost) {
		this.logger.error('unhandled error', exception)
		const { httpAdapter } = this.httpAdapterHost

		const ctx = host.switchToHttp()

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR

		const responseBody = {
			statusCode: httpStatus,
			timestamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
		}

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
	}

	constructor(public httpAdapterHost: HttpAdapterHost) {}
}
