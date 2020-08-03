import { getRankIcon } from "../enums/riot-enums.js";

const getChampion = (team) =>
    team.reduce(
        (teamInformation, teamPlayer) =>
            (teamInformation += `${teamPlayer.championName}\n`),
        ""
    );

const getRanks = (client, team) =>
    team.reduce(
        (teamInformation, teamPlayer) =>
            (teamInformation += `${client.emojis
                .get(getRankIcon(teamPlayer.playerRank))
                .toString()} ${teamPlayer.playerRank}\n`),
        ""
    );

const getPlayers = (team) =>
    team.reduce(
        (teamInformation, teamPlayer) =>
            (teamInformation += `${teamPlayer.summonerName}\n`),
        ""
    );

const createTeamColumnss = (client, twoTeams) => [
    {
        name: `${client.emojis.get("739932832243253372").toString()} Blue Team`,
        value: getPlayers(twoTeams[0]),
        inline: true,
    },
    {
        name: "Ranked/Champion WR",
        value: getChampion(twoTeams[0]),
        inline: true,
    },
    {
        name: "Rank",
        value: getRanks(client, twoTeams[0]),
        inline: true,
    },
    {
        name: `${client.emojis.get("739932832226345183").toString()} Red Team`,
        value: getPlayers(twoTeams[1]),
        inline: true,
    },
    {
        name: "Ranked/Champion WR",
        value: getChampion(twoTeams[1]),
        inline: true,
    },
    {
        name: "Rank",
        value: getRanks(client, twoTeams[1]),
        inline: true,
    },
];

const constructMatchCronEmbed = (client, summoner, twoTeams) => ({
    embed: {
        color: 3447003,
        title: `${summoner.name}'s Match`,
        author: {
            name: "League of Legends",
            icon_url:
                "https://vignette.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343",
        },
        fields: createTeamColumnss(client, twoTeams),
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
        ([teamOne, teamTwo], player) =>
            player.teamId === 100
                ? [[...teamOne, player], teamTwo]
                : [teamOne, [...teamTwo, player]],
        [[], []]
    );

export const matchCronEmbed = (client, playerRankList, summoner) => {
    console.log("playerRankList :>> ", playerRankList);
    console.log("summoner :>> ", summoner);
    const twoTeams = splitIntoTeams(playerRankList);

    return constructMatchCronEmbed(client, summoner, twoTeams);
};
