import { Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { ExecutionContext } from '@nestjs/common'

import { UserContext } from '../entities/usercontext'
import { Request } from 'express'
import { Context } from '../entities/context'
import { CanActivate } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private configService: ConfigService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const type: string =context.getType()
		let request
		if (type === `graphql`){
			const gqlContext = GqlExecutionContext.create(context);
			request = gqlContext.getContext().req;
		}
		else{
	    request = context.switchToHttp().getRequest()
	     }
		const user = this.validateTokenFromHeader(request)
		if (user.isAuthenticated) {
			request['user'] = user
			return user.isAuthenticated
		} else {
			console.log("here")
			throw new UnauthorizedException()
		}
	}

	validateTokenFromHeader(request: Request): Context {
		const userName = this.configService.get('authentication.basic.username')
		const pass = this.configService.get('authentication.basic.pass')
		try {
			const basicAuthToken = request.headers['authorization'] as string
			if (!basicAuthToken.startsWith('Basic')) {
				throw new UnauthorizedException()
			}
			const encodedString = basicAuthToken.split(' ')[1]
			const decodedString = Buffer.from(encodedString, 'base64').toString(
				'utf-8'
			)
			return new Context(
				new UserContext(userName),
				decodedString === `${userName}:${pass}`
			)
		} catch {
			throw new UnauthorizedException()
		}
	}
}
