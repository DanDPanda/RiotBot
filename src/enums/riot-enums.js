const ranks = {
    UNRANKED: "729402529229832212",
    IRON: "729398415141896242",
    BRONZE: "729398414948696105",
    SILVER: "729398415091433553",
    GOLD: "729398415078981653",
    PLATINUM: "729398414848032919",
    DIAMOND: "729398415192096768",
    MASTER: "729398414994964640",
    CHALLENGER: "729398414818934834",
};

const mastery = {
    1: "729400923905851470",
    2: "729400923926823042",
    3: "729400923754856639",
    4: "729400923390083104",
    5: "729400923490615307",
    6: "729400923574501437",
    7: "729400923792736327",
};

const summonerSpells = {
    1: "740224282193297508",
    3: "740224282193428512",
    4: "740224282231308319",
    7: "740224282298417283",
    21: "740224282231046185",
    12: "740224281992232971",
    11: "740224282121994251",
    13: "740224281849364542,",
    14: "740224282075987989",
    32: "740224282029850706"
};

export const getRankIcon = (playerRank) => {
    if (playerRank.includes("IRON")) return ranks.IRON;
    else if (playerRank.includes("BRONZE")) return ranks.BRONZE;
    else if (playerRank.includes("SILVER")) return ranks.SILVER;
    else if (playerRank.includes("GOLD")) return ranks.GOLD;
    else if (playerRank.includes("PLATINUM")) return ranks.PLATINUM;
    else if (playerRank.includes("DIAMOND")) return ranks.DIAMOND;
    else if (playerRank.includes("MASTER")) return ranks.MASTER;
    else if (playerRank.includes("CHALLENGER")) return ranks.CHALLENGER;
    return ranks.UNRANKED;
};

export const getChampionMasteryIcon = (championLevel) =>
    mastery[championLevel] ? mastery[championLevel] : "729402529229832212";

export const getSummonerSpellIcon = (summonerSpellId) =>
    summonerSpells[summonerSpellId]
        ? summonerSpells[summonerSpellId]
        : "729402529229832212";
