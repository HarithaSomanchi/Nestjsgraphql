import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common'

@Controller()
export class HealthController {
	@Get('/health')
	getHello() {
		return {
			message: 'ok',
		}
	}
}
