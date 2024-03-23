import { UpdatePersonInput } from '../inputs/person.update'
import { Context } from '../entities/context'
import { Person } from '../models/person'

import { CreatePersonInput } from '../inputs/person.input'

export const updatePersonFromInput = (
	id: string,
	input: UpdatePersonInput,
	context: Context,
	existingModel: Person
) => {
	existingModel.lastName = input.lastName
	existingModel.personId = id
	existingModel.address = input.address
	existingModel.city = input.city
	existingModel.phno = input.phno
	existingModel.value = input.value
	return existingModel
}

export const createPersonFromInput = (
	id: string,
	input: CreatePersonInput,
	context: Context
) => {
	const model = new Person()
	model.lastName = input.lastName
	model.personId = id
	model.address = input.address
	model.city = input.city
	model.createdOn = new Date()
	model.phno = input.phno
	model.value = input.value
	return model
}
