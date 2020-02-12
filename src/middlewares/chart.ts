import {ContextMessageUpdate} from "telegraf";

export const aboutMiddleware = async (ctx: ContextMessageUpdate) => {
    let text: string = '';
    text += 'This app was created to tell you about virus.\n';
    text += 'Subscribe to get new info.\n';
    text += `Current chat username: ${ctx.chat && ctx.chat.username || 0}`;
    await ctx.reply(text);
};
