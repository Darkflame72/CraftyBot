import { bold, hyperlink, UnsafeEmbedBuilder } from '@discordjs/builders';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { MessageFlags } from 'discord-api-types/v10';

@RegisterCommand({
	name: 'vote',
	description: 'Support the bot by voting for it.'
})
export class UserCommand extends Command {
	private readonly devs = [
		bold(hyperlink('Tj#0001', 'https://github.com/talle117')),
		bold(hyperlink('Chinese_Marc#7768', 'https://github.com/ChineseMarc')),
		bold(hyperlink('Robert#0006', 'https://github.com/treboryx'))
	];

	private readonly staff = [
		bold(hyperlink('LeeSpork#8175', '')),
		bold(hyperlink('Name With Exactly 32 Characters!#4004', '')),
		bold(hyperlink('Z_runner#7515', '')),
		bold(hyperlink('Darkflame72#1150', 'https://github.com/darkflame72'))
	];

	private readonly tools = [
		bold(hyperlink('Discord.js', 'https://discord.js.org')),
		bold(hyperlink('Mojang API', 'https://wiki.vg/Mojang_API')),
		bold(hyperlink('Server information', 'https://github.com/treboryx/mc-stats')),
		bold(hyperlink('HTTP Framework', 'https://github.com/skyra-project/archid-components/tree/main/packages/shared-http-pieces'))
	];

	public override chatInputRun(): Command.Response {
		const embed = new UnsafeEmbedBuilder().addFields(
			{ name: 'Developers', value: this.devs.join('\n') },
			{ name: 'Staff', value: this.staff.join('\n') },
			{ name: 'Tools', value: this.tools.join('\n') }
		);

		return this.message({
			embeds: [embed.toJSON()],
			flags: MessageFlags.Ephemeral
		});
	}
}
