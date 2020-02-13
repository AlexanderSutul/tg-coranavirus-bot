import Telegraf from "telegraf";
import {aboutMiddleware, chartMiddleware, startMiddleware, statisticsMiddleware} from "./middlewares/middlewares";

const token = `1073229717:AAHo8XD6AWXpR561YW3Gc-o8cGKum8LN_Iw`;
const bot = new Telegraf(token);
console.log('App runs...');
try {
    (async () => {
        bot.start(startMiddleware);
        bot.hears('Statistics', statisticsMiddleware);
        bot.hears('Chart', chartMiddleware);
        bot.hears('About', aboutMiddleware);
        await bot.startPolling();
        console.log('App launched');
    })();
} catch (e) {
    console.log('Error is ', e);
}
