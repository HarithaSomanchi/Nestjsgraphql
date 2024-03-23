import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { MongooseModuleOptions } from '@nestjs/mongoose'

import { MongooseOptionsFactory } from '@nestjs/mongoose'
@Injectable()
export class MongoConfig implements MongooseOptionsFactory {
	constructor(private configService: ConfigService) {}

	createMongooseOptions():
		| MongooseModuleOptions
		| Promise<MongooseModuleOptions> {
		return {
			uri: `mongodb://${this.configService.get(
				'db.mongo.host'
			)}/${this.configService.get('db.mongo.database')}`,
		}
	}
}
