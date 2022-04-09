import { inviteLink } from '#constants/constants';
import { defaultComponents } from '#utils/buttons';
import { EmbedBuilder, hyperlink } from '@discordjs/builders';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { MessageFlags, type APIEmbed } from 'discord-api-types/v10';

@RegisterCommand((builder) =>
	builder //
		.setName('volunteer')
		.setDescription('Help with volunteering for Crafty.')
)
export class UserCommand extends Command {
	readonly #descriptionContent = [
		'Crafty needs you and your skills!\n',
		`Currently the team behind Crafty are looking for people who can help Crafty in many ways, below are the current positions we have available. Join the support Discord server and message a member of the staff/developer team here ${inviteLink} if you are interested in helping out!`
	].join('\n');

	readonly #translators = [
		'Do you speak a language other than English fluently? We are looking for people to help translate Crafty into multiple languages. Currently we are looking for the following languages:',
		':flag_de: German',
		':flag_es: Spanish',
		':flag_fr: French',
		':flag_ru: Russian',
		':flag_pt: Portuguese',
		`\nDo you speak a language not on this list and would like to help translate, join the support Discord server ${hyperlink(
			'here',
			inviteLink
		)} and let us know!`
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
			translators: 'Translators'
		};

		const fields = {
			translators: this.#translators
		};

		return new EmbedBuilder() //
			.setColor(0x254fb9)
			.setDescription(this.#descriptionContent)
			.addFields({
				name: titles.translators,
				value: fields.translators
			})
			.toJSON();
	}
}
