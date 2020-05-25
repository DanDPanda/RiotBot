import fs from "fs";
import cron from "node-cron";

import { lolMatchChecker } from "./commands/riot/match-cron.js";

export const cronJobs = (client) => {
    cron.schedule("*/2 * * * *", () => {
        const jsonData = fs.readFileSync("./src/data/riot-match-checker.json");
        const riotMatchList = JSON.parse(jsonData);

        riotMatchList.users.forEach(({ discordId, lolName, inGame }, index) => {
            setTimeout(() => {
                lolMatchChecker(client, fs, discordId, lolName, inGame);
            }, 5000 * index);
        });
    });
};
