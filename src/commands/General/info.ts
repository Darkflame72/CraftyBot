import { defaultComponents } from '#utils/buttons';
import { EmbedBuilder, time, TimestampStyles } from '@discordjs/builders';
import { roundNumber } from '@sapphire/utilities';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { MessageFlags, type APIEmbed } from 'discord-api-types/v10';
import { cpus, uptime, type CpuInfo } from 'node:os';

@RegisterCommand((builder) =>
	builder //
		.setName('info')
		.setDescription('Provides information about this application, and links for adding it and joining the support server.')
)
export class UserCommand extends Command {
	readonly #descriptionContent = ['The most advanced Minecraft bot for Discord.', 'A must-have bot for your Minecraft community.'].join('\n');

	readonly #intlNumberFormatter = new Intl.NumberFormat('en-GB', {
		maximumFractionDigits: 2
	});

	public override chatInputRun() {
		return this.message({
			flags: MessageFlags.Ephemeral,
			embeds: [this.embed],
			components: defaultComponents()
		});
	}

	private get embed(): APIEmbed {
		const titles = {
			uptime: 'Uptime',
			serverUsage: 'Server Usage'
		};
		const uptime = this.uptimeStatistics;
		const usage = this.usageStatistics;

		const fields = {
			uptime: [
				//
				`• **Host**: ${uptime.host}`,
				`• **Process**: ${uptime.process}`
			].join('\n'),
			serverUsage: [
				//
				`• **CPU Load**: ${usage.cpuLoad}`,
				`• **Heap**: ${usage.ramUsed}MB (Total: ${usage.ramTotal}MB)`
			].join('\n')
		};

		return new EmbedBuilder() //
			.setColor(0x254fb9)
			.setDescription(this.#descriptionContent)
			.addFields(
				{
					name: titles.uptime,
					value: fields.uptime
				},
				{
					name: titles.serverUsage,
					value: fields.serverUsage
				}
			)
			.toJSON();
	}

	private get uptimeStatistics(): StatsUptime {
		const now = Date.now();
		const nowSeconds = roundNumber(now / 1000);
		return {
			host: time(roundNumber(nowSeconds - uptime()), TimestampStyles.RelativeTime),
			process: time(roundNumber(nowSeconds - process.uptime()), TimestampStyles.RelativeTime)
		};
	}

	private get usageStatistics(): StatsUsage {
		const usage = process.memoryUsage();
		return {
			cpuLoad: cpus().slice(0, 2).map(UserCommand.formatCpuInfo.bind(null)).join(' | '),
			ramTotal: this.#intlNumberFormatter.format(usage.heapTotal / 1048576),
			ramUsed: this.#intlNumberFormatter.format(usage.heapUsed / 1048576)
		};
	}

	private static formatCpuInfo({ times }: CpuInfo) {
		return `${roundNumber(((times.user + times.nice + times.sys + times.irq) / times.idle) * 10000) / 100}%`;
	}
}

interface StatsUptime {
	host: string;
	process: string;
}

interface StatsUsage {
	cpuLoad: string;
	ramTotal: string;
	ramUsed: string;
}
