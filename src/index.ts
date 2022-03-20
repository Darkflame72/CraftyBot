import { Client, Registry } from "@skyra/http-framework";
async function client() {
  const client = new Client({
    discordPublicKey: process.env.DISCORD_PUBLIC_KEY,
  });
  await client.load();
  await client.listen({ port: 3000 });
  console.log("Logged in!");
}
async function commandregister() {
  const registry = new Registry({ token: process.env.DISCORD_TOKEN });
  await registry.load();
  await registry.registerGlobalCommands();
  await registry.registerGuildRestrictedCommands();
}
client();
commandregister();
