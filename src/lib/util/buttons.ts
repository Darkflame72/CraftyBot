import { inviteButton, sponsorButton, SupportServerButton } from '#constants/constants';
import { ActionRowBuilder, type MessageActionRowComponentBuilder } from '@discordjs/builders';
import type { APIActionRowComponent, APIButtonComponent, APISelectMenuComponent } from 'discord-api-types/v10';

export function defaultComponents(): APIActionRowComponent<APIButtonComponent | APISelectMenuComponent>[] {
	const firstActionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>() //
		.addComponents(inviteButton, SupportServerButton)
		.toJSON();

	const secondActionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>() //
		.addComponents(sponsorButton)
		.toJSON();

	return [firstActionRow, secondActionRow];
}
