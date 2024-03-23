import { readYamlEnvSync } from 'yaml-env-defaults'
import { join } from 'path'

const YAML_CONFIG_FILENAME: string = '../../config/config.yaml'

export const config = () => {
	const config = readYamlEnvSync(
		join(__dirname, YAML_CONFIG_FILENAME),
		process.env
	)

	return config
}
export default config
