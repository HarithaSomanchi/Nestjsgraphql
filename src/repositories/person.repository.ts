import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { RepositoryUtils } from './repository.utils'

import { Person } from '../models/person'
import { CrudRepository } from './crud.repository.interface'
import { PagingAndSortingRepository } from './paging.sorting.repository.interface'
@Injectable()
export class PersonRepository
	implements
		CrudRepository<Person, string>,
		PagingAndSortingRepository<Person>
{
	constructor(
		@InjectModel(Person.name) public model: Model<Person>,
		private readonly repositoryUtils: RepositoryUtils
	) {}

	async save(entity: Person): Promise<Person> {
		entity._id = entity.personId
		const modifiedModel = new this.model(entity)
		return modifiedModel.save()
	}

	async findById(id: string): Promise<Person | undefined> {
		const existingModel = await this.model.findById(id)
		return existingModel
	}

	async deleteById(id: string): Promise<void> {
		await this.model.findByIdAndDelete(id)
	}

	async findAll(
		filters: string,
		sort: string,
		limit: number,
		offset: number
	): Promise<Person[] | undefined> {
		const filterConditions = this.repositoryUtils.filterConditionProcessor(
			filters,
			Person.name
		)

		const orderByConditions =
			this.repositoryUtils.orderByConditionProcessor(sort, Person.name)

		const response = await this.model
			.find(filterConditions)
			.limit(limit)
			.skip(offset)
			.sort(orderByConditions)
			.exec()
		return response
	}
}
