import { HttpStatus } from '@nestjs/common'

import { HellonestauthCustomException } from './hellonestauth.custom.exception'

export class PersonNotFound extends HellonestauthCustomException {
	constructor(message: string) {
		super(message, HttpStatus.NOT_FOUND)
	}
}
