import "dotenv/config";
import { Client } from "@skyra/http-framework";
import { Registry } from "@skyra/http-framework";
async function client() {
  const client = new Client({
    discordPublicKey: process.env.DISCORD_PUBLIC_KEY,
  });
  await client.load();
  await client.listen({ port: 3000, address: "0.0.0.0" });
  console.log("Logged in!");
}
async function commandregister() {
  const registry = new Registry({ token: process.env.DISCORD_TOKEN });
  await registry.load();
  await registry.registerGlobalCommands();
  await registry.registerGuildRestrictedCommands();
}
client();

// currently a slight bug with double ups but is being fixed upstream
// commandregister();
