export type BooleanString = 'true' | 'false';
export type IntegerString = `${bigint}`;

export type EnvAny = keyof Env;
export type EnvString = {
	[K in EnvAny]: Env[K] extends BooleanString | IntegerString ? never : K;
}[EnvAny];
export type EnvBoolean = {
	[K in EnvAny]: Env[K] extends BooleanString ? K : never;
}[EnvAny];
export type EnvInteger = {
	[K in EnvAny]: Env[K] extends IntegerString ? K : never;
}[EnvAny];

export interface Env {
	DISCORD_CLIENT_ID: string;
	DISCORD_APPLICATION_SECRET: string;
	DISCORD_PUBLIC_KEY: string;
	DOTENV_DEBUG_ENABLED: BooleanString;
	NODE_ENV: 'test' | 'development' | 'production';
}
