import { isSortValid } from './validator'
import { ParserException } from '../exceptions/parser.exception'
import { Sort } from '../entities/sort'

export const sortParser = (sorts: string, modelName: string): Sort[] => {
	const processedSort: Sort[] = []
	let sortDirection = ''
	let sortField = ''
	const errorMessages = []
	try {
		if (sorts === '') {
			return processedSort
		}
		sorts.split(',').forEach((entry) => {
			if (entry.charAt(0) === '+' || entry.charAt(0) === '-') {
				sortDirection = entry.charAt(0)
				sortField = entry.substring(1)
			} else {
				sortDirection = '-'
				sortField = entry
			}
			if (isSortValid(modelName, sortField)) {
				processedSort.push(new Sort(sortField, sortDirection))
			} else {
				errorMessages.push(
					`${modelName} has no sort field ${sortField}`
				)
			}
		})
	} catch (e) {
		throw new ParserException('failed to parse sort')
	}

	if (errorMessages.length > 0) {
		throw new ParserException(errorMessages.join(','))
	}

	return processedSort
}
