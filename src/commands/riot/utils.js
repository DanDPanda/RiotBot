import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export const sendLoLAPIRequest = async url => {
    const response = await fetch(`https://na1.api.riotgames.com/lol/${url}`, {
        method: "get",
        headers: {
            "X-Riot-Token": process.env.RIOT_API_KEY
        }
    });
    const json = await response.json();
    return json;
};
