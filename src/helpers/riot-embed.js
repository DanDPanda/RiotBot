const formatPlayerInfoToString = (teamPlayerList) => {
    let teamInformation = "";
    teamPlayerList.forEach((teamPlayer) => {
        teamInformation += `${teamPlayer.summonerName}: ${teamPlayer.championName} - ${teamPlayer.playerRank}\n\n`;
    });

    return teamInformation;
};

const createTeamColumns = (twoTeams) =>
    twoTeams.map((team, index) => ({
        name: `Team ${index + 1}`,
        value: formatPlayerInfoToString(team),
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
        fields: createTeamColumns(twoTeams),
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

export const matchCronEmbed = (playerRankList, summoner) => {
    const twoTeams = splitIntoTeams(playerRankList);
    return constructEmbed(summoner, twoTeams);
};
