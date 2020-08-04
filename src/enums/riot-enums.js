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
    mastery1: "729400923905851470",
    mastery2: "729400923926823042",
    mastery3: "729400923754856639",
    mastery4: "729400923390083104",
    mastery5: "729400923490615307",
    mastery6: "729400923574501437",
    mastery7: "729400923792736327",
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

export const getChampionMasteryIcon = (championLevel) => {
    console.log("championLevel :>> ", championLevel);
    if (championLevel === 1) return mastery.mastery1;
    else if (championLevel === 2) return mastery.mastery2;
    else if (championLevel === 3) return mastery.mastery3;
    else if (championLevel === 4) return mastery.mastery4;
    else if (championLevel === 5) return mastery.mastery5;
    else if (championLevel === 6) return mastery.mastery6;
    else if (championLevel === 7) return mastery.mastery7;
    return "729402529229832212";
};
