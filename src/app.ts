import { TaskRunner } from './tasks/task-runner';
import { unsubscribeMiddleware } from './middlewares/unsubscribe';
import { subscribeMiddleware } from './middlewares/subscribe';
import { ConfigService } from './services/config.service';
import Telegraf from "telegraf";
import { aboutMiddleware, chartMiddleware, startMiddleware, statisticsMiddleware } from "./middlewares/middlewares";
import { actionHandler } from "./routes/actions/actions";

ConfigService.configureApp();

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
    bot.hears('Subscribe', subscribeMiddleware);
    bot.hears('Unsubscribe', unsubscribeMiddleware);

    actionHandler(bot);

    bot.startPolling();

    // run tasks here
    const taskRunner = new TaskRunner();
    taskRunner.runTasks();

    console.log('App launched');
  })();
} catch (e) {
  console.log('Error is ', e);
  bot.stop()
    .then(() => {
      console.log('Bot stopeed');
    });
}
