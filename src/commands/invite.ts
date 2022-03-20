import { Command, RegisterCommand } from "../http-framework/index";
import { MessageFlags } from "discord-api-types/v9";

@RegisterCommand({
  name: "invite",
  description: "Check how you can invite me.",
})
export class UserCommand extends Command {
  public chatInputRun(): Command.Response {
    const content = `You can invite me anytime by opening my user card. You can also invite me by clicking the links below!\n\n${this.makeUrl(
      431402543336390666n,
      ""
    )}`;
    return this.message({ content, flags: MessageFlags.Ephemeral });
  }

  private makeUrl(clientId: bigint, permissions: string) {
    return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot%20applications.commands`;
  }
}
