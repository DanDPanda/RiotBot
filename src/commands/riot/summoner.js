// import Discord from "discord.js";
// import { sendLoLAPIRequest } from "./utils.js";

// const constructEmbed = (summonerResult, summonerRankedResult) => {
//     const message = new Discord.RichEmbed()
//         .setColor("#0099ff")
//         .setTitle("Player Stats")
//         .setAuthor(
//             "League of Legends",
//             "https://vignette.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343"
//         )
//         .setDescription(`${summonerResult.name}'s Stats`)
//         .setThumbnail(
//             "https://vignette.wikia.nocookie.net/leagueoflegends/images/1/12/League_of_Legends_Icon.png/revision/latest?cb=20150402234343"
//         )
//         .addField(
//             "Ranked Solo/Duo Rank",
//             `${summonerRankedResult[1].tier} ${summonerRankedResult[1].rank}`,
//             true
//         )
//         .addBlankField(true)
//         .addField(
//             "Ranked Solo/Duo Wins",
//             `${summonerRankedResult[1].wins}`,
//             true
//         )
//         .addField(
//             "Ranked Flex Rank",
//             `${summonerRankedResult[0].tier} ${summonerRankedResult[0].rank}`,
//             true
//         )
//         .addField("Ranked Flex Wins", `${summonerRankedResult[0].wins}`, true)
//         .setTimestamp()
//         .setFooter(
//             "All data derived from the Riot Games API",
//             "https://cdn-images-1.medium.com/max/1200/1*IOMogY9xupXEg_ndWOb_4A.png"
//         );
//     return message;
// };

// export const summoner = async (message, client) => {
//     const messageArray = message.content.split(" ");
//     const summonerName = messageArray.slice(1);
//     const summonerNameQueryParam = summonerName.join("%20");
//     const summonerResult = await sendLoLAPIRequest(
//         `summoner/v4/summoners/by-name/${summonerNameQueryParam}`
//     );

//     if (!summonerResult) {
//         return;
//     }

//     const summonerRankedResult = await sendLoLAPIRequest(
//         `league/v4/entries/by-summoner/${summonerResult.id}`
//     );

//     if (!summonerRankedResult) {
//         return;
//     }

//     return constructEmbed(summonerResult, summonerRankedResult);
// };
