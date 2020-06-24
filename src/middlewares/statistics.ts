import {ContextMessageUpdate, Markup} from "telegraf";
import {statisticService} from "../services/statistic.service";
import {Statistics} from "../models/statistics";
import {BotAction} from "../routes/actions/actions";

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

    const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
        Markup.callbackButton('👍', BotAction.LikePandemic.toString()),
        Markup.callbackButton('👎', BotAction.DislikePandemic.toString())
    ]).extra()

    const { from } = ctx;

    if (from) {
        await ctx.telegram.sendMessage(
            from.id,
            `Hi ${from.username || 'anonymous'}. Do you like this pandemic statistic?`,
            inlineMessageRatingKeyboard
        )
    }
};
