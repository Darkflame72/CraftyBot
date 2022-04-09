import { hyperlink } from '@discordjs/builders';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { MessageFlags } from 'discord-api-types/v10';

@RegisterCommand((builder) =>
	builder //
		.setName('rps')
		.setDescription('Rock, paper or shears?')
		.addStringOption((builder) =>
			builder //
				.setName('choice')
				.setDescription('Your choice')
				.setRequired(true)
				.addChoices({ name: 'rock', value: 'rock' }, { name: 'paper', value: 'paper' }, { name: 'shears', value: 'shears' })
		)
)
export class UserCommand extends Command {
	readonly #options = ['rock', 'paper', 'shears'];
	public override chatInputRun(_: never, { choice }: { choice: string }): Command.Response {
		if (!this.#options.includes(choice)) {
			const content = `You can only choose between ${this.#options.map((option) => hyperlink(option, option)).join(', ')}`;
			return this.message({ content, flags: MessageFlags.Ephemeral });
		}

		const botChoice = this.#options[Math.floor(Math.random() * this.#options.length)];
		let content = `I chose ${botChoice} you chose ${choice}.`;
		if (botChoice === choice) content += "\nIt's a tie!";
		else if ((this.#options.findIndex((option) => option === botChoice) + 1) % 3 === this.#options.findIndex((option) => option === choice))
			content += '\nYou win!';
		else content += '\nI win!';
		return this.message({ content });
	}
}
