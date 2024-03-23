import { UserContext } from './usercontext'

export class Context {
	userContext: UserContext

	isAuthenticated: boolean

	constructor(userContext: UserContext, isAuthenticated: boolean) {
		this.userContext = userContext
		this.isAuthenticated = isAuthenticated
	}
}
