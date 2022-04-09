import { bold, EmbedBuilder, hyperlink } from '@discordjs/builders';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { APIEmbed, MessageFlags } from 'discord-api-types/v10';
import { defaultComponents } from '#utils/buttons';

@RegisterCommand({
	name: 'credits',
	description: 'See the team behind Crafty and what services we use.'
})
export class UserCommand extends Command {
	readonly #descriptionContent = ['These are the tools and people that bring you Crafty.'].join('\n');

	readonly #devs = [
		bold(hyperlink('Tj#0001', 'https://github.com/talle117')),
		bold(hyperlink('Chinese_Marc#7768', 'https://github.com/ChineseMarc')),
		bold(hyperlink('Robert#0006', 'https://github.com/treboryx'))
	].join('\n');

	readonly #staff = [
		bold(hyperlink('LeeSpork#8175', '')),
		bold(hyperlink('Name With Exactly 32 Characters!#4004', '')),
		bold(hyperlink('Z_runner#7515', '')),
		bold(hyperlink('Darkflame72#1150', 'https://github.com/darkflame72'))
	].join('\n');

	readonly #tools = [
		bold(hyperlink('Discord.js', 'https://discord.js.org')),
		bold(hyperlink('Mojang API', 'https://wiki.vg/Mojang_API')),
		bold(hyperlink('Server information', 'https://github.com/treboryx/mc-stats')),
		bold(hyperlink('HTTP Framework', 'https://github.com/skyra-project/archid-components/tree/main/packages/shared-http-pieces'))
	].join('\n');

	public override chatInputRun() {
		return this.message({
			flags: MessageFlags.Ephemeral,
			embeds: [this.embed],
			components: defaultComponents()
		});
	}

	private get embed(): APIEmbed {
		const titles = {
			devs: 'Devs',
			staff: 'Staff',
			tools: 'Tools'
		};
		const fields = {
			devs: this.#devs,
			staff: this.#staff,
			tools: this.#tools
		};
		return new EmbedBuilder() //
			.setColor(0x254fb9)
			.setDescription(this.#descriptionContent)
			.addFields(
				{
					name: titles.staff,
					value: fields.staff
				},
				{
					name: titles.devs,
					value: fields.devs
				},
				{
					name: titles.tools,
					value: fields.tools
				}
			)
			.toJSON();
	}
}
