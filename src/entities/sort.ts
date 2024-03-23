export class Sort {
	columnName: string

	orderType: string

	constructor(columnName: string, orderType: string) {
		this.columnName = columnName
		this.orderType = orderType
	}
}
