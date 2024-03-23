import { regex } from './find.all.constants'
import { fieldTypeMapper } from './find.all.constants'
import { isFilterOperationValid } from './validator'
import { ParserException } from '../exceptions/parser.exception'
import { SearchQuery } from '../entities/searchquery'

export const filterParser = (
	filters: string,
	modelName: string
): SearchQuery[] => {
	try {
		const searchQuery: SearchQuery[] = []
		const errorMessages: string[] = []
		if (filters === '') {
			return searchQuery
		}
		filters.split(':and:').forEach((filter) => {
			const matchResult = filter.match(regex)
			const filterName = matchResult[1]
			const operation = matchResult[2]
			const filterValue = getFieldValue(
				filterName,
				matchResult[3],
				modelName
			)
			if (isFilterOperationValid(filterName, operation, modelName)) {
				searchQuery.push(
					new SearchQuery(filterName, operation, filterValue)
				)
			} else {
				errorMessages.push(
					`operation ${operation} is not allowed on ${filterName}`
				)
			}
		})

		if (errorMessages.length > 0) {
			throw new ParserException(errorMessages.join(', \n'))
		}
		return searchQuery
	} catch (e) {
		throw new ParserException('failed to parse')
	}
}

const getFieldValue = (
	fieldName: string,
	fieldValue: any,
	modelName: string
) => {
	const modelTypeMapper = fieldTypeMapper.get(modelName) || new Map()
	const type = modelTypeMapper.get(fieldName) || ''

	if (type === 'string') {
		return fieldValue.toString()
	} else if (type === 'number') {
		return parseInt(fieldValue, 10)
	} else if (type === 'Date') {
		return new Date(fieldValue)
	} else if (type === 'Boolean') {
		return fieldValue.toString().toLowerCase() == 'true'
	}
	return fieldValue.toString()
}
