import {ContextMessageUpdate} from "telegraf";

export const aboutMiddleware = async (ctx: ContextMessageUpdate) => {
    let text: string = '';
    text += 'This app is created to tell you about COVID-19 (2019-nCoV) virus.\n';
    text += 'Subscribe to get new info.\n';
    text += `Current chat username: ${ctx.chat && ctx.chat.username || 0}`;
    await ctx.reply(text);
};
