import { subject } from './../services/subscribe.service';
import { ContextMessageUpdate, Markup } from "telegraf";
import { statisticService } from "../services/statistic.service";
import { Statistics } from "../models/statistics";
import { BotAction } from "../routes/actions/enums";
import { Message } from "telegraf/typings/telegram-types";

export const statisticsMiddleware = async (ctx: ContextMessageUpdate): Promise<Message | undefined> => {

  console.log(`Subscribed: ${subject.subs.size}`);

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

  if (!from) return;

  const message = await ctx.telegram.sendMessage(
    from.id,
    `Hi ${from.username || 'anonymous'}. Do you like this pandemic statistic?`,
    inlineMessageRatingKeyboard
  );

  return message;
};
