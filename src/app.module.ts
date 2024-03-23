import { Module } from '@nestjs/common'
import { LoggerAdapter } from './logger/logger.adapter'
import { DefaultService } from './rest/default'
import { HttpModule } from '@nestjs/axios'
import { PersonController } from './controllers/person.mutation.controller'
import { PersonQueryController } from './controllers/person.query.controller'
import { PersonRepository } from './repositories/person.repository'
import { RepositoryUtils } from './repositories/repository.utils'
import { PersonService } from './services/person.service'
import { HealthController } from './controllers/health.controller'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Person } from './models/person'
import { PersonSchema } from './models/Person'
import { MongoConfig } from './configurations/mongo.config'
import appconfiguration from './configurations/app.configuration'
import { PersonResolver } from './resolver/qeuryresolver'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
@Module({
	controllers: [PersonController, PersonQueryController, HealthController],
	providers: [
		LoggerAdapter,
		DefaultService,
		RepositoryUtils,
		PersonService,
		PersonRepository,
		PersonResolver
	],
	imports: [
		HttpModule,
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useClass: MongoConfig,
		}),
		MongooseModule.forFeature([
			{ name: Person.name, schema: PersonSchema },
		]),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appconfiguration],
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
		  }),
	],
	exports: [LoggerAdapter],
})
export class AppModule {}
