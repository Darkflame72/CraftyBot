import { inviteLink } from '#constants/constants';
import { getGuildIds } from '#utils/utils';
import { hyperlink } from '@discordjs/builders';
import { Command, RegisterCommand, RestrictGuildIds } from '@skyra/http-framework';
import { MessageFlags } from 'discord-api-types/v10';

@RegisterCommand({
	name: 'invite',
	description: 'Check how you can invite me.'
})
@RestrictGuildIds(getGuildIds())
export class UserCommand extends Command {
	public override chatInputRun(): Command.Response {
		const content = `You can invite me anytime by opening my user card. You can also use the following ${hyperlink('link', inviteLink)}.`;
		return this.message({ content, flags: MessageFlags.Ephemeral });
	}
}
