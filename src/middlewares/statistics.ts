import {ContextMessageUpdate} from "telegraf";
import axios from 'axios';
import {RequestsService} from "../services/requests.service";
import {ConfigService} from "../services/config.service";
import {statisticService} from "../services/statistic.service";

const formatNumber = (num: number, locale: string = 'de-DE'): string => {
    return new Intl.NumberFormat(locale).format(num)
}

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
    const stats = statisticsByCountriesOrginize(statisticsByCountries);

    let replyText: string = '';
    replyText += `Total confirmed️️☢️: ${formatNumber(totalConfirmed)}\n`;
    replyText += `Total died⚰️: ${formatNumber(totalDeath)}\n`;
    replyText += `Total recovered💚: ${formatNumber(totalRecovered)}\n`;
    replyText += `Statistics by countries:\n`;

    for (const stat of stats) {
        replyText += `${formatNumber(stat.idx)}. `
            + `${stat.region}`
            + ` ☢️: ${formatNumber(stat.confirmed)}`
            + ` ⚰️: ${formatNumber(stat.death)}`
            + ` 💚: ${formatNumber(stat.recovered)}`
            + `\n`;
        if (stat.idx % 50 === 0) {
            await ctx.reply(replyText);
            replyText = '';
        }
    }

    await ctx.reply(replyText);
};
