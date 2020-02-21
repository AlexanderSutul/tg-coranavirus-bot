import {ContextMessageUpdate} from "telegraf";
import axios from 'axios';
import {RequestsService} from "../services/requests";
import {Config} from "../services/config";
import {statisticService} from "../services/statistic";

export const statisticsMiddleware = async (ctx: ContextMessageUpdate) => {

    const {
        getTotalConfirmed,
        getTotalDeath,
        getTotalRecovered,
        getStatisticsByCountries,
        statisticsByCountriesOrginize
    } = statisticService;

    const [totalConfirmed, totalDeath, totalRecovered, statisticsByCountries] = await Promise.all([
        getTotalConfirmed(), getTotalDeath(), getTotalRecovered(), getStatisticsByCountries()
    ]);

    let replyText: string = '';
    replyText += `Total confirmed️️☢️: ${totalConfirmed}\n`;
    replyText += `Total died⚰️: ${totalDeath}\n`;
    replyText += `Total recovered💚: ${totalRecovered}\n`;

    const stats = statisticsByCountriesOrginize(statisticsByCountries);

    replyText += `Statistics by countries:\n`;

    stats.forEach(stat => {
       replyText += `${stat.idx + 1}. ${stat.region} ☢️: ${stat.confirmed} ⚰️: ${stat.death} 💚: ${stat.recovered}\n`
    });

    await ctx.reply(replyText);
};
