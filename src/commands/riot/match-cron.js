import { sendLoLAPIRequest, getChampions } from "./utils.js";
import { changeRiotMatchCheckerInGameStatus } from "../../repository/riot-repository.js";

const getChampionNameFromChampionId = (champions, championId) =>
    Object.keys(champions).find(
        (champion) => champions[champion].key == championId
    );

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

const constructEmbed = (summonerResult, twoTeams) => ({
    embed: {
        color: 3447003,
        title: `${summonerResult.name}'s Match`,
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

const splitIntoTeams = (playerRankedList) =>
    playerRankedList.reduce(
        ([teamOne, teamTwo], player) => {
            return player.teamId === 100
                ? [[...teamOne, player], teamTwo]
                : [teamOne, [...teamTwo, player]];
        },
        [[], []]
    );

export const lolMatchChecker = async (
    client,
    fs,
    discordId,
    lolName,
    inGame,
    region
) => {
    const summonerResult = await sendLoLAPIRequest(
        `summoner/v4/summoners/by-name/${lolName}`,
        region
    );
    if (!summonerResult.id) return;

    const { participants } = await sendLoLAPIRequest(
        `spectator/v4/active-games/by-summoner/${summonerResult.id}`,
        region
    );
    if (!participants) {
        if (inGame) {
            changeRiotMatchCheckerInGameStatus(fs, lolName, inGame);
        }

        return;
    } else {
        if (inGame) {
            return;
        }

        changeRiotMatchCheckerInGameStatus(fs, lolName, inGame);
    }

    const champions = await getChampions();

    const playerRankedList = await Promise.all(
        participants.map(
            async ({ summonerId, summonerName, teamId, championId }) => {
                let playerRank = "unranked";

                const summonerRankedResult = await sendLoLAPIRequest(
                    `league/v4/entries/by-summoner/${summonerId}`,
                    region
                );

                summonerRankedResult.forEach((result) => {
                    if (result.queueType === "RANKED_SOLO_5x5") {
                        playerRank = `${result.tier} ${result.rank}`;
                    }
                });

                return {
                    summonerName,
                    playerRank,
                    teamId,
                    championName: getChampionNameFromChampionId(
                        champions,
                        championId
                    ),
                };
            }
        )
    );

    const twoTeams = splitIntoTeams(playerRankedList);
    const embed = constructEmbed(summonerResult, twoTeams);

    client.users.get(discordId).send(embed);
};
