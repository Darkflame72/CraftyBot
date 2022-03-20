import { Client } from "./http-framework/index";
import { Registry } from "./http-framework/index";

const registry = new Registry({
  token: process.env.DISCORD_TOKEN,
});

// Load all the commands and message component handlers:
await registry.load();

// Register all global commands:
await registry.registerGlobalCommands();

// Register all the guild-restricted commands:
await registry.registerGuildRestrictedCommands();

const client = new Client({
  discordPublicKey: process.env.DISCORD_PUBLIC_KEY,
});

// Load all the commands and message component handlers:
await client.load();
console.log("Loaded all the commands and message component handlers.");
// Start up the HTTP server;
await client.listen({ port: 3000 });
