export interface PagingAndSortingRepository<T> {
	findAll(
		filters: string,
		sort: string,
		limit: number,
		offset: number
	): Promise<T[] | undefined>
}
