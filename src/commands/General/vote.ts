import { embedColor } from '#constants/constants';
import { getGuildIds } from '#utils/utils';
import { bold, EmbedBuilder, hyperlink } from '@discordjs/builders';
import { Command, RegisterCommand, RestrictGuildIds } from '@skyra/http-framework';

@RegisterCommand({
	name: 'vote',
	description: 'Support the bot by voting for it.'
})
@RestrictGuildIds(getGuildIds())
export class UserCommand extends Command {
	readonly #description = [
		'Upvoting is a free way to show your support for Crafty. It helps increase Craftys ranking on Discord bot listing websites. Below are a few ways you can upvote Crafty.\n',
		`${hyperlink('Top.gg', 'https://top.gg/bot/crafty/vote')} (Upvote rewards)`,
		`${hyperlink('Bots For Discord', 'https://botsfordiscord.com/bot/crafty')}`,
		`\n${bold('Vote locking')}`,
		"While using Crafty you may notice that some commands require you to upvote Crafty for you to continue. This lock is in place to slowdown traffic on highly used commands. If you're unable to upvote or would like to skip it, you can use /vote skip. Skipping the upvote will remove the votelock on commands."
	].join('\n');

	public override chatInputRun(): Command.Response {
		const embed = new EmbedBuilder().setColor(embedColor).setDescription(this.#description).setTitle('Upvote Crafty');
		return this.message({
			embeds: [embed.toJSON()]
		});
	}
}
