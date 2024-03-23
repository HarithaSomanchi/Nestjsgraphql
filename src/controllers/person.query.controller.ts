import { Controller } from '@nestjs/common'
import { DefaultValuePipe } from '@nestjs/common'
import { Get } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { Query } from '@nestjs/common'
import { ContextDecor } from '../configurations/context.decorator'
import { Context } from '../entities/context'

import { Param } from '@nestjs/common'
import { PersonService } from '../services/person.service'
import { Logger } from '@nestjs/common'
@Controller('/v1/')
export class PersonQueryController {
	readonly logger: Logger = new Logger(this.constructor.name)

	@Get('persons')
	@ApiQuery({ name: 'filters', required: false })
	@ApiQuery({ name: 'sortFields', required: false })
	@ApiQuery({ name: 'limit', required: false })
	@ApiQuery({ name: 'offset', required: false })
	async select(
		@Query('filters', new DefaultValuePipe('')) filters: string,
		@Query('sortFields', new DefaultValuePipe('')) sortFields: string,
		@Query('limit', new DefaultValuePipe(10)) limit: number,
		@Query('offset', new DefaultValuePipe(0)) offset: number,
		@ContextDecor() context: Context
	) {
		this.logger.log(
			`Received a selectAll request for Person with filters: ${filters} sort: ${sortFields} limit: ${limit} offset: ${offset}`
		)
		const response = await this.personService.select(
			filters,
			sortFields,
			limit,
			offset,
			context
		)
		this.logger.log(
			`SelectAll request for Person with filters: ${filters} sort: ${sortFields} limit: ${limit} offset: ${offset} is complete `
		)
		return response
	}

	@Get('persons/:personId')
	async get(
		@Param('personId') personId: string,
		@ContextDecor() context: Context
	) {
		this.logger.log(`Received a get request for Person: ${personId}`)
		const existingPerson = await this.personService.get(personId, context)
		this.logger.log(`Get request for Person ${personId} is complete `)
		return existingPerson
	}

	constructor(private personService: PersonService) {}
}
