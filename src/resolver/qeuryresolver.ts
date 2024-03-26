import { Controller, Post, Res, UseGuards } from '@nestjs/common'
import { DefaultValuePipe } from '@nestjs/common'
import { Get } from '@nestjs/common'
import { Param } from '@nestjs/common'
import { ContextDecor } from '../configurations/context.decorator'
import { Response } from 'express'
import { Context } from '../entities/context'

import { ApiQuery } from '@nestjs/swagger'
// import { Query } from '@nestjs/common'
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { PersonService } from '../services/person.service'
import { Logger } from '@nestjs/common'
// import { Resolver } from '@nestjs/graphql'
import { Person } from 'src/models/person'
import { UserContext } from 'src/entities/usercontext'
import { CreatePersonInput } from 'src/inputs/person.input'
import { v4 } from 'uuid'
import { UpdatePersonInput } from 'src/inputs/person.update'
import { AuthGuard } from 'src/configurations/auth.configuration'
import { PersonController } from 'src/controllers/person.mutation.controller'
import { PersonQueryController } from 'src/controllers/person.query.controller'
@Resolver(() => Person)
export class PersonResolver {
	readonly logger: Logger = new Logger(this.constructor.name)
  @UseGuards(AuthGuard)
  @Query(() => String)
  sayHello(): string {
	console.log("in heelo")
    return 'Hello World!';
  }
    // @UseGuards(AuthGuard)
	// @Query(() => Person)
	// async get( @Args('personId') personId: string,@ContextDecor() context: Context,) {
	// 	console.log("in the get")
		
	// 	//this.logger.log(`Received a get request for Person: ${personId}`)
	// 	const existingPerson = await this.personController.get(personId, context)
	// 	//this.logger.log(`Get request for Person ${personId} is complete `)
	// 	return existingPerson
	// }
	@UseGuards(AuthGuard)
    @Mutation(() => Person)
    async createPost(
     @Args('createPersonInput') createPersonInput: CreatePersonInput,@ContextDecor() context: Context, @Res() response: Response) {
        this.logger.log(`Received a new create request in resolver `)
		const created= await this.personController.create(createPersonInput,context,response)
		console.log(created)
		const created1 = await created.json();
        console.log(created1)
		return created1
    }
	//  @Mutation(() => Person)
    // async updatePost(
	// 	@Args('personId') personId: string,
	// 	@Args('updatePersonInput') updatePersonInput: UpdatePersonInput,@ContextDecor() context: Context,) {
    //     this.logger.log(`Received a new create request `)
	// 	const updtedPerson = await this.personService.update(
	// 		personId,
	// 		updatePersonInput,
	// 		context
	// 	)
	// 	return updtedPerson
    //  }
	//  @Mutation(() => String)
    // async deletePost( @Args('personId') personId: string,) {
    //     this.logger.log(`Received a new create request `)
	// 	await this.personService.delete(personId, new Context( new UserContext("sweety"), false))
	// 	return "DELETED"
    //  }

   
  

	constructor(private personController: PersonController) {}
	
	
}


