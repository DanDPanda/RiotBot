import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export const sendLoLAPIRequest = async (url, region = "na1") => {
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
};

export const getChampions = async () => {
    const response = await fetch(
        "http://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/champion.json"
    );

    const json = await response.json();

    return json.data;
};
