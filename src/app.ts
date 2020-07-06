import Telegraf from "telegraf";
import { aboutMiddleware, chartMiddleware, startMiddleware, statisticsMiddleware } from "./middlewares/middlewares";
import { config } from 'dotenv';
import { actionHandler } from "./routes/actions/actions";

config();

const token = process.env.TG_TOKEN;

if (!token) {
  throw new Error('There is no token');
}

const bot = new Telegraf(token);
console.log('App runs...');
try {
  (async () => {
    bot.start(startMiddleware);
    bot.hears('Statistics', statisticsMiddleware);
    bot.hears('Chart', chartMiddleware);
    bot.hears('About', aboutMiddleware);

    actionHandler(bot);

    await bot.startPolling();
    console.log('App launched');
  })();
} catch (e) {
  console.log('Error is ', e);
}
