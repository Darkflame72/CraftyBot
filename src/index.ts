import "dotenv/config";
import { Client, ListenOptions } from "@skyra/http-framework";
import { Registry } from "@skyra/http-framework";

interface Options {
  discordPublicKey: string | undefined;
  token: string | undefined;
}

class Crafty extends Client {
  public readonly registry: Registry;

  public constructor(options: Options) {
    super(options);
    this.registry = new Registry(options);
  }

  private async registerCommands(): Promise<void> {
    await this.registry.load();
    await this.registry.registerGlobalCommands();
    await this.registry.registerGuildRestrictedCommands();
    console.log("Registered commands!");
  }

  public async run(options: ListenOptions): Promise<void> {
    await this.load();
    await this.registerCommands();
    await this.listen(options);
    console.log("Logged in!");
  }
}

const client = new Crafty({
  discordPublicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_TOKEN,
});

client.run({ port: 3000, address: "0.0.0.0" });
