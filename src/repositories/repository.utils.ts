import { Injectable } from '@nestjs/common'
import { filterParser } from '../utils/filter.parser'
import { sortParser } from '../utils/sort.parser'

import { Operations } from '../utils/find.all.constants'
@Injectable()
export class RepositoryUtils {
	filterConditionProcessor(filters: string, modelName: string) {
		const processedFilters = filterParser(filters, modelName)
		const conditions = {}
		processedFilters.forEach((filter) => {
			conditions[filter.filterName] = this.getCondition(
				filter.operation,
				filter.filterValue
			)
		})

		return conditions
	}

	orderByConditionProcessor(sort: string, modelName: string) {
		const sortConditions = {}
		const processedSort = sortParser(sort, modelName)
		processedSort.forEach((entry) => {
			sortConditions[entry.columnName] = entry.orderType === '+' ? 1 : -1
		})
		return sortConditions
	}

	getCondition(operation: string, filterValue: any) {
		const condition = {}
		condition[Operations[operation]] = filterValue
		return condition
	}
}
