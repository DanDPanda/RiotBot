import Discord from "discord.js";
const client = new Discord.Client();
import dotenv from "dotenv";
dotenv.config();

import { commandList } from "./command-list.js";
import { cronJobs } from "./cron-jobs.js";

// Attemps to connect to Discord
try {
    process.env.NODE_ENV === "DEV"
        ? client.login(process.env.DISCORD_DEV)
        : client.login(process.env.DISCORD_PROD);
} catch (e) {
    console.log("Discord is down");
}

// Message the client displays when ready
client.on("ready", () => {
    console.log("Bot Online");
    cronJobs(client);
});

// This reads the message and sends the appropriate command
client.on("message", async (message) => {
    const commandName = message.content.split(" ")[0];
    const commandFunction = commandList[commandName];

    if (commandFunction) {
        const commandMessage = await commandFunction(message, client);
        if (commandMessage) {
            message.channel.send(commandMessage);
        }
    }
});
