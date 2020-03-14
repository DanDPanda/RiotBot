import { ping } from "./commands/ping.js";
import { summoner } from "./commands/riot/summoner.js";

export const commandList = {
  "!ping": ping,
  "!summoner": summoner
};
