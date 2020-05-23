export const changeRiotMatchCheckerInGameStatus = (fs, lolName, inGame) => {
    const jsonData = fs.readFileSync("./src/data/riot-match-checker.json");
    const riotMatchList = JSON.parse(jsonData);

    riotMatchList["users"].find(
        (riotMatch) => riotMatch.lolName === lolName
    ).inGame = !inGame;

    const backToJson = JSON.stringify(riotMatchList, null, 4);
    fs.writeFileSync("./src/data/riot-match-checker.json", backToJson);
};
