import { envParseArray } from '#env/utils';

export function getGuildIds(): readonly string[] {
	return envParseArray('COMMAND_GUILD_IDS', []);
}
