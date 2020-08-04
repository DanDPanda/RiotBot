import {
    getChampions,
    changeRiotMatchCheckerInGameStatus,
    selectSummoner,
    selectActiveGame,
    selectPlayerRanks,
    selectPlayerChampionMastery,
} from "../repository/riot-repository.js";

export const getSummonerBySummonerName = (lolName, region) =>
    selectSummoner(lolName, region);

export const getActiveGameBySummonerId = (summoner, region) =>
    selectActiveGame(summoner, region);

export const getChampionRankBySummonerIdAndChampionId = (
    summonerId,
    championId,
    region
) => selectPlayerChampionMastery(summonerId, championId, region);

export const checkInGameStatus = (fs, participants, { lolName, inGame }) => {
    if (!participants) {
        if (inGame) {
            changeRiotMatchCheckerInGameStatus(fs, lolName, inGame);
        }

        return false;
    } else {
        if (inGame) return false;

        changeRiotMatchCheckerInGameStatus(fs, lolName, inGame);
    }

    return true;
};

export const getPlayerRanks = async (participants, region) => {
    const getChampionNameFromChampionId = (champions, championId) =>
        Object.keys(champions).find(
            (champion) => champions[champion].key == championId
        );

    const champions = await getChampions();

    return await Promise.all(
        participants.map(
            async ({ summonerId, summonerName, teamId, championId }) => {
                let playerRank = "unranked";

                const summonerRankedResult = await selectPlayerRanks(
                    summonerId,
                    region
                );

                const { championLevel } = await selectPlayerChampionMastery(
                    summonerId,
                    championId,
                    region
                );

                try {
                    summonerRankedResult.forEach((result) => {
                        if (result.queueType === "RANKED_SOLO_5x5") {
                            playerRank = `${result.tier} ${result.rank}`;
                        }
                    });
                } catch (error) {
                    console.log(
                        `summonerRankedResult: ${JSON.stringify(
                            summonerRankedResult,
                            null,
                            4
                        )}`
                    );
                    console.log(`error: ${error}`);
                }

                return {
                    summonerName,
                    playerRank,
                    teamId,
                    championLevel,
                    championName: getChampionNameFromChampionId(
                        champions,
                        championId
                    ),
                };
            }
        )
    );
};
