import { ApiProperty } from '@nestjs/swagger'
import { Age } from '../enums/age'
import { Field, InputType, Int } from '@nestjs/graphql'
@InputType()
export class CreatePersonInput {
	@ApiProperty()
	@Field()
	lastName: string
    @Field(()=>Int)
	@ApiProperty()
	address: number
    @Field()
	@ApiProperty()
	city: boolean
    @Field(()=>Int)
	@ApiProperty()
	phno: number
    @Field(()=>Age)
	@ApiProperty({ enum: Age, isArray: false })
	value: Age
}
