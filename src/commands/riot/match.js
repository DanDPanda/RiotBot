import { sendLoLAPIRequest } from "./utils.js";

const formateTeamToString = teamPlayerList => {
    let teamInformation = "";
    teamPlayerList.forEach(teamPlayer => {
        teamInformation += `${teamPlayer.summonerName}: ${teamPlayer.playerRank}\n\n`;
    });

    return teamInformation;
};

const formatTeamsToFields = twoTeams =>
    twoTeams.map((team, index) => ({
        name: `Team ${index + 1}`,
        value: formateTeamToString(team),
        inline: true
    }));

const constructEmbed = (summonerResult, twoTeams) => ({
    embed: {
        color: 3447003,
        title: `${summonerResult.name}'s Match`,
        author: {
            name: "League of Legends",
            icon_url:
                "https://vignette.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343"
        },
        fields: formatTeamsToFields(twoTeams),
        timestamp: new Date(),
        footer: {
            icon_url:
                "https://cdn-images-1.medium.com/max/1200/1*IOMogY9xupXEg_ndWOb_4A.png",
            text: "All data derived from the Riot Games API"
        }
    }
});

const splitIntoTeams = playerRankedList =>
    playerRankedList.reduce(
        ([teamOne, teamTwo], player) => {
            return player.teamId === 100
                ? [[...teamOne, player], teamTwo]
                : [teamOne, [...teamTwo, player]];
        },
        [[], []]
    );

export const match = async (message, client) => {
    const messageArray = message.content.split(" ");
    const summonerName = messageArray.slice(1);
    const summonerNameQueryParam = summonerName.join("%20");
    const summonerResult = await sendLoLAPIRequest(
        `summoner/v4/summoners/by-name/${summonerNameQueryParam}`
    );

    if (!summonerResult) {
        return;
    }

    const { participants } = await sendLoLAPIRequest(
        `spectator/v4/active-games/by-summoner/${summonerResult.id}`
    );

    if (!participants) {
        return;
    }

    let playerRankedList = [];

    for await (const { summonerId, summonerName, teamId } of participants) {
        let playerRank = "unranked";
        const summonerRankedResult = await sendLoLAPIRequest(
            `league/v4/entries/by-summoner/${summonerId}`
        );

        summonerRankedResult.forEach(result => {
            if (result.queueType === "RANKED_SOLO_5x5") {
                playerRank = `${result.tier} ${result.rank}`;
            }
        });

        playerRankedList.push({
            summonerName,
            playerRank,
            teamId
        });
    }

    const twoTeams = splitIntoTeams(playerRankedList);
    return constructEmbed(summonerResult, twoTeams);
};
