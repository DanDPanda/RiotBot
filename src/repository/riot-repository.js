import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const sendLoLAPIRequest = async (url, region = "na1") => {
    setTimeout(() => {
        const response = await fetch(
            `https://${region}.api.riotgames.com/lol/${url}`,
            {
                method: "get",
                headers: {
                    "X-Riot-Token": process.env.RIOT_API_KEY,
                },
            }
        );
        const json = await response.json();

        return json;
    }, 1000)
};

export const selectSummoner = (lolName, region) =>
    sendLoLAPIRequest(`summoner/v4/summoners/by-name/${lolName}`, region);

export const selectActiveGame = ({ id }, region) =>
    sendLoLAPIRequest(`spectator/v4/active-games/by-summoner/${id}`, region);

export const selectPlayerRanks = (id, region) =>
    sendLoLAPIRequest(`league/v4/entries/by-summoner/${id}`, region);

export const selectPlayerChampionMastery = (id, championId, region) =>
    sendLoLAPIRequest(
        `champion-mastery/v4/champion-masteries/by-summoner/${id}/by-champion/${championId}`,
        region
    );

export const getChampions = async () => {
    const response = await fetch(
        "http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json"
    );

    const json = await response.json();

    return json.data;
};

export const changeRiotMatchCheckerInGameStatus = (fs, lolName, inGame) => {
    const jsonData = fs.readFileSync("./src/data/riot-match-checker.json");
    const riotMatchList = JSON.parse(jsonData);

    riotMatchList["users"].find(
        (riotMatch) => riotMatch.lolName === lolName
    ).inGame = !inGame;

    const backToJson = JSON.stringify(riotMatchList, null, 4);
    fs.writeFileSync("./src/data/riot-match-checker.json", backToJson);
};
