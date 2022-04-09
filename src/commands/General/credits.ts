import { EmbedBuilder, hyperlink } from '@discordjs/builders';
import { Command, RegisterCommand, RestrictGuildIds } from '@skyra/http-framework';
import { APIEmbed, MessageFlags } from 'discord-api-types/v10';
import { defaultComponents } from '#utils/buttons';
import { embedColor } from '#constants/constants';
import { getGuildIds } from '#utils/utils';

@RegisterCommand({
	name: 'credits',
	description: 'See the team behind Crafty and what services we use.'
})
@RestrictGuildIds(getGuildIds())
export class UserCommand extends Command {
	readonly #descriptionContent = ['These are the tools and people that bring you Crafty.'].join('\n');

	readonly #devs = [
		hyperlink('Tj#0001', 'https://github.com/talle117'),
		hyperlink('Chinese_Marc#7768', 'https://github.com/ChineseMarc'),
		hyperlink('Robert#0006', 'https://github.com/treboryx')
	].join('\n');

	readonly #staff = [
		hyperlink('LeeSpork#8175', 'https://github.com/LeeSpork'),
		hyperlink('Name With Exactly 32 Characters!#4004', 'https://github.com/Bobby-McBobface'),
		hyperlink('Z_runner#7515', 'https://github.com/ZRunner'),
		hyperlink('Darkflame72#1150', 'https://github.com/darkflame72'),
		hyperlink('KidOfCubes#4867', 'https://github.com/KidOfCubes')
	].join('\n');

	readonly #tools = [
		hyperlink('Discord.js', 'https://discord.js.org'),
		hyperlink('Mojang API', 'https://wiki.vg/Mojang_API'),
		hyperlink('Server information', 'https://github.com/treboryx/mc-stats'),
		hyperlink('HTTP Framework', 'https://github.com/skyra-project/archid-components/tree/main/packages/shared-http-pieces')
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
			.setColor(embedColor)
			.setDescription(this.#descriptionContent)
			.addFields(
				{
					name: titles.devs,
					value: fields.devs,
					inline: true
				},
				{
					name: titles.staff,
					value: fields.staff,
					inline: true
				},
				{
					name: titles.tools,
					value: fields.tools,
					inline: true
				}
			)
			.toJSON();
	}
}
