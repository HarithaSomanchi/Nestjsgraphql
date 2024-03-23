export class SearchQuery {
	filterName: string

	operation: string

	filterValue: any

	constructor(filterName: string, operation: string, filterValue: any) {
		this.filterName = filterName
		this.operation = operation
		this.filterValue = filterValue
	}
}
