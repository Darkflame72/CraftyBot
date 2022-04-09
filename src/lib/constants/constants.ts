import { ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord-api-types/v10';
import os from 'node:os';

export const FailPrefix = `I am sorry, but` as const;
export const FetchUserAgent = `Crafty Discord Bot (node-fetch) ${os.platform()}/${os.release()} (https://crafty.gg)`;

export const inviteLink = 'https://crafty.gg/bot/invite';

export const SupportServerButton = new ButtonBuilder()
	.setStyle(ButtonStyle.Link)
	.setURL('https://discord.gg/zB6fEQW')
	.setLabel('Support Server')
	.setEmoji({ name: '🆘' });

export const inviteButton = new ButtonBuilder()
	.setStyle(ButtonStyle.Link)
	.setURL(inviteLink)
	.setLabel('Add me to your server!')
	.setEmoji({ name: '🎉' });

export const sponsorButton = new ButtonBuilder()
	.setStyle(ButtonStyle.Link)
	.setURL('https://crafty.gg/premium')
	.setLabel('Premium')
	.setEmoji({ name: '🧡' });