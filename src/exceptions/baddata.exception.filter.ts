import { Catch } from '@nestjs/common'
import { Request } from 'express'
import { Response } from 'express'
import { BadRequestException } from '@nestjs/common'
import { ArgumentsHost } from '@nestjs/common'

import { ExceptionFilter } from '@nestjs/common'
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
	catch(exception: BadRequestException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const status = exception.getStatus()

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			errors: exception.getResponse()['message'],
			path: request.url,
		})
	}
}
