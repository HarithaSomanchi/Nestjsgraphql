import { allowedModelFilters } from './find.all.constants'
import { allowedModelSorts } from './find.all.constants'

export const isFilterOperationValid = (
	filterName: string,
	operation: string,
	modelName: string
): boolean => {
	const allowedFilters = allowedModelFilters.get(modelName) || new Map()
	const allowedOperations = allowedFilters.get(filterName) || []

	if (allowedOperations.find((it) => it === operation)) {
		return true
	}
	return false
}

export const isSortValid = (modelName: string, sortField: string): boolean => {
	const allowedSorts = allowedModelSorts.get(modelName) || new Set()
	return allowedSorts.has(sortField)
}
