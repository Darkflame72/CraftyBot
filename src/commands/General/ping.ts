import { Command, RegisterCommand } from "@skyra/http-framework";
import {
  APIInteractionResponse,
  APIApplicationCommandInteraction,
  InteractionResponseType,
} from "discord-api-types/v9";

@RegisterCommand({
  name: "ping",
  description: "Runs a network connection test with me.",
})
export class UserCommand extends Command {
  public chatInputRun(
    _interaction: APIApplicationCommandInteraction
  ): APIInteractionResponse {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { content: "Pong!" },
    };
  }
}
