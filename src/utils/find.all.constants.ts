export const regex = /(\w+):(\w+):(.*)/

export const allowedModelSorts: Map<string, Set<string>> = new Map()

export const allowedModelFilters: Map<string, Map<string, string[]>> = new Map()

export const fieldTypeMapper: Map<string, Map<string, string>> = new Map()

export const Operations = {
	eq: '$eq',
	gt: '$gt',
	gte: '$gte',
	lt: '$lt',
	lte: '$lte',
}

const personModelProperty: Map<string, string> = new Map()

const allowedPersonFilters: Map<string, string[]> = new Map()

allowedModelSorts.set('Person', new Set(['']))

allowedModelFilters.set('Person', allowedPersonFilters)
personModelProperty.set('lastName', 'string')
personModelProperty.set('personId', 'string')
personModelProperty.set('address', 'number')
personModelProperty.set('city', 'boolean')
personModelProperty.set('createdOn', 'Date')
fieldTypeMapper.set('Person', personModelProperty)
