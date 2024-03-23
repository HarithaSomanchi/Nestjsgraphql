import { Schema } from '@nestjs/mongoose'

import { Prop } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Age } from '../enums/age'
import { SchemaFactory } from '@nestjs/mongoose'
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
registerEnumType(Age, {
	name: 'Age',
  });
@ObjectType()
@Schema()
export class Person {
	@Prop()
	@ApiProperty()
	@Field()
	lastName: string

    @Field(()=>ID)
	@Prop()
	@ApiProperty()
	personId: string

    @Field(()=>Int)
	@Prop()
	@ApiProperty()
	address: number

    @Field()
	@Prop()
	@ApiProperty()
	city: boolean

    @Field(()=>Date)
	@Prop()
	@ApiProperty()
	createdOn: Date

    @Field(()=>Int)
	@Prop()
	@ApiProperty()
	phno: number

    @Field(()=>Age)
	@Prop()
	@ApiProperty({ enum: Age, isArray: false })
	value: Age
	
    @Field()
	@Prop()
	_id: string
}

export const PersonSchema: SchemaFactory = SchemaFactory.createForClass(Person)
