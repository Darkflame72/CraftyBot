import { config } from 'dotenv-cra';
import { fileURLToPath, URL } from 'node:url';

process.env.NODE_ENV ??= 'development';

config({
	path: fileURLToPath(new URL('../../../.env', import.meta.url))
});
