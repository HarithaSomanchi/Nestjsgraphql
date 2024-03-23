import { HttpStatus } from '@nestjs/common'

import { HellonestauthCustomException } from './hellonestauth.custom.exception'

export class ParserException extends HellonestauthCustomException {
	constructor(message: string) {
		super(message, HttpStatus.BAD_REQUEST)
	}
}
