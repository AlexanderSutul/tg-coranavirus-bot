import {ContextMessageUpdate} from "telegraf";
import {statisticService} from "../services/statistic.service";
import {Statistics} from "../models/statistics";

export const statisticsMiddleware = async (ctx: ContextMessageUpdate) => {
    const {
        getTotalConfirmed,
        getTotalDeath,
        getTotalRecovered,
        getStatisticsByCountries,
    } = statisticService;

    const [
        totalConfirmed, totalDeath, totalRecovered, statisticsByCountries
    ] = await Promise.all([
        getTotalConfirmed(), getTotalDeath(), getTotalRecovered(), getStatisticsByCountries()
    ]);

    const statistics = new Statistics(
        statisticsByCountries, totalConfirmed, totalDeath, totalRecovered
    );

    const report = statistics.getReport();

    const slicedReportParts = Statistics.useSlicer(report);

    for (const part of slicedReportParts) await ctx.reply(part, { parse_mode: 'HTML' });
};
