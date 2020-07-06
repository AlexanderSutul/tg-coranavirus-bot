import Telegraf from "telegraf";
import { aboutMiddleware, chartMiddleware, startMiddleware, statisticsMiddleware } from "./middlewares/middlewares";
import { config } from 'dotenv';
import { actionHandler } from "./routes/actions/actions";

config();

const telegramToken = process.env.TG_TOKEN;

if (!telegramToken) {
  throw new Error('There is no telegram token, make sure that param TG_TOKEN has been added to .env file.');
}

const bot = new Telegraf(telegramToken);
console.log('App runs...');
try {
  (async () => {
    bot.start(startMiddleware);
    bot.hears('Statistics', statisticsMiddleware);
    bot.hears('Chart', chartMiddleware);
    bot.hears('About', aboutMiddleware);

    actionHandler(bot);

    bot.startPolling();
    console.log('App launched');
  })();
} catch (e) {
  console.log('Error is ', e);
  bot.stop()
    .then(() => {
      console.log('Bot stopeed');
    });
}
