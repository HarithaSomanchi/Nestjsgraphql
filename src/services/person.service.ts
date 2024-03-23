import { Injectable } from '@nestjs/common'
import { Context } from '../entities/context'

import { UpdatePersonInput } from '../inputs/person.update'
import { CreatePersonInput } from '../inputs/person.input'
import { createPersonFromInput } from '../mappers/person.mapper'
import { updatePersonFromInput } from '../mappers/person.mapper'
import { PersonNotFound } from '../exceptions/person.not.found'
import { PersonRepository } from '../repositories/person.repository'
import { Logger } from '@nestjs/common'
@Injectable()
export class PersonService {
	readonly logger: Logger = new Logger(this.constructor.name)

	async select(
		filters: string,
		sortFields: string,
		limit: number,
		offset: number,
		context: Context
	) {
		const records = await this.personRepository.findAll(
			filters,
			sortFields,
			limit,
			offset
		)
		return records
	}

	async delete(personId: string, context: Context) {
		const existingPersonData = await this.personRepository.findById(
			personId
		)
		await this.personRepository.deleteById(personId)
	}

	async update(
		personId: string,
		updatePersonInput: UpdatePersonInput,
		context: Context
	) {
		const existingPersonData = await this.personRepository.findById(
			personId
		)
		if (!existingPersonData) {
			throw new PersonNotFound('failed to getby Id personId}')
		}
		const updatedPerson = updatePersonFromInput(
			personId,
			updatePersonInput,
			context,
			existingPersonData
		)
		const savedPerson = this.personRepository.save(updatedPerson)
		return savedPerson
	}

	async create(
		personId: string,
		createPersonInput: CreatePersonInput,
		context: Context
	) {
		const person = createPersonFromInput(
			personId,
			createPersonInput,
			context
		)
		const createdPerson = await this.personRepository.save(person)
		return createdPerson
	}

	async get(personId: string, context: Context) {
		const existingPerson = await this.personRepository.findById(personId)
		if (!existingPerson) {
			this.logger.error(`personId: ${personId} notFound`)
			throw new PersonNotFound(`personId: ${personId} notFound`)
		}
		return existingPerson
	}

	constructor(private personRepository: PersonRepository) {}
}
