import {
    checkInGameStatus,
    getSummonerBySummonerName,
    getActiveGameBySummonerId,
    getPlayerRanks,
} from "../../service/riot-service.js";
import { matchCronEmbed } from "../../helpers/riot-embed.js";

export const lolMatchChecker = async (client, fs, riotMatch) => {
    const { discordId, lolName, region } = riotMatch;

    const summoner = await getSummonerBySummonerName(lolName, region);
    if (!summoner.id) return;

    const { participants } = await getActiveGameBySummonerId(summoner, region);
    const sendMessage = checkInGameStatus(fs, participants, riotMatch);
    if (!sendMessage) return;

    const playerRankList = await getPlayerRanks(participants, region);
    const embed = matchCronEmbed(playerRankList, summoner);

    client.users.get(discordId).send(embed);
};
