import { Injectable } from '@nestjs/common'
import axios from '@nestjs/axios'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DefaultService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService
	) {
		httpService.axiosRef.defaults.baseURL = this.configService.get(
			'rest.default.baseurl'
		)
		httpService.axiosRef.defaults.timeout = this.configService.get(
			'rest.default.timeout'
		)

		httpService.axiosRef.interceptors.request.use((config) => {
			config.headers.set('Content-Type', 'application/json')

			return config
		})
	}
}
