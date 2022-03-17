import { Client } from "./http-framework/index";

const client = new Client({
  discordPublicKey: process.env.DISCORD_PUBLIC_KEY,
});

// Load all the commands and message component handlers:
await client.load();
console.log("Loaded all the commands and message component handlers.");
// Start up the HTTP server;
await client.listen({ port: 3000 });
