import { Controller } from '@nestjs/common'
import { Response } from 'express'
import { v4 } from 'uuid'
import { Delete } from '@nestjs/common'
import { Param } from '@nestjs/common'
import { ContextDecor } from '../configurations/context.decorator'
import { Context } from '../entities/context'

import { Put } from '@nestjs/common'
import { Body } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { UpdatePersonInput } from '../inputs/person.update'
import { Res } from '@nestjs/common'

import { AuthGuard } from '../configurations/auth.configuration'
import { Post } from '@nestjs/common'
import { HttpCode } from '@nestjs/common'
import { UseGuards } from '@nestjs/common'
import { ApiBasicAuth } from '@nestjs/swagger'
import { CreatePersonInput } from '../inputs/person.input'
import { PersonService } from '../services/person.service'
import { Logger } from '@nestjs/common'
@Controller('/v1/')
export class PersonController {
	readonly logger: Logger = new Logger(this.constructor.name)

	@Delete('persons/:personId')
	async delete(
		@Param('personId') personId: string,
		@ContextDecor() context: Context
	) {
		this.logger.log(`Received a delete request for : ${personId} `)
		await this.personService.delete(personId, context)
		this.logger.log(
			`Delete request completed for  ${personId} is complete `
		)
	}

	@Put('persons/:personId')
	async update(
		@Param('personId') personId: string,
		@Body(new ValidationPipe()) updatePersonInput: UpdatePersonInput,
		@ContextDecor() context: Context,
		@Res() response: Response
	) {
		this.logger.log(`Received a update request for : ${personId}`)
		const updtedPerson = await this.personService.update(
			personId,
			updatePersonInput,
			context
		)
		response.setHeader('Location', '/v1/persons/' + personId)
		response.json(updtedPerson)
		this.logger.log(`Update request for  is complete: ${personId}`)
		return response
	}

	@Post('persons')
	@HttpCode(200)
	@UseGuards(AuthGuard)
	@ApiBasicAuth()
	async create(
		@Body(new ValidationPipe()) createPersonInput: CreatePersonInput,
		@ContextDecor() context: Context,
		@Res() response: Response
	) {
		this.logger.log(`Received a new create request controller`)
		const personId = v4()
		const created = await this.personService.create(
			personId,
			createPersonInput,
			context
		)
		console.log(created)
		response.setHeader('Location', '/v1/persons/' + personId)
		response.json(created)
		this.logger.log(`Create request for Person ${personId} is complete`)
		this.logger.log(`beforeeee`)
		return response
	}

	constructor(private personService: PersonService) {}
}
