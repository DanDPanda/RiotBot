import { sendLoLAPIRequest, getChampions } from "./utils.js";
import {
    checkInGameStatus,
    getSummonerBySummonerName,
    getActiveGameBySummonerId,
    getPlayerRanks,
} from "../../service/riot-service.js";

const formateTeamToString = (teamPlayerList) => {
    let teamInformation = "";
    teamPlayerList.forEach((teamPlayer) => {
        teamInformation += `${teamPlayer.summonerName}: ${teamPlayer.championName} - ${teamPlayer.playerRank}\n\n`;
    });

    return teamInformation;
};

const formatTeamsToFields = (twoTeams) =>
    twoTeams.map((team, index) => ({
        name: `Team ${index + 1}`,
        value: formateTeamToString(team),
        inline: true,
    }));

const constructEmbed = (summoner, twoTeams) => ({
    embed: {
        color: 3447003,
        title: `${summoner.name}'s Match`,
        author: {
            name: "League of Legends",
            icon_url:
                "https://vignette.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343",
        },
        fields: formatTeamsToFields(twoTeams),
        timestamp: new Date(),
        footer: {
            icon_url:
                "https://cdn-images-1.medium.com/max/1200/1*IOMogY9xupXEg_ndWOb_4A.png",
            text: "All data derived from the Riot Games API",
        },
    },
});

const splitIntoTeams = (playerRankList) =>
    playerRankList.reduce(
        ([teamOne, teamTwo], player) => {
            return player.teamId === 100
                ? [[...teamOne, player], teamTwo]
                : [teamOne, [...teamTwo, player]];
        },
        [[], []]
    );

export const lolMatchChecker = async (client, fs, riotMatch) => {
    const { discordId, lolName, region } = riotMatch;

    const summoner = await getSummonerBySummonerName(lolName, region);
    if (!summoner.id) return;

    const { participants } = await getActiveGameBySummonerId(summoner, region);
    const sendMessage = checkInGameStatus(fs, participants, riotMatch);
    if (!sendMessage) return;

    const playerRankList = await getPlayerRanks(participants, region);

    const twoTeams = splitIntoTeams(playerRankList);
    const embed = constructEmbed(summoner, twoTeams);

    client.users.get(discordId).send(embed);
};
