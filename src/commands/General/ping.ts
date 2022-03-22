import { Command, RegisterCommand } from "../../http-framework/index";
import type {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
} from "discord-api-types/v9";

@RegisterCommand((builder) =>
  builder //
    .setName("ping")
    .setDescription("Runs a network connection test with me")
)
export class UserCommand extends Command {
  public chatInputRun(
    interaction: APIApplicationCommandInteraction
  ): APIInteractionResponse {
    return this.message({
      content: `Pong!`,
    });
  }
}
