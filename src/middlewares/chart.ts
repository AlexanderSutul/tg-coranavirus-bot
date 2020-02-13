import {ContextMessageUpdate} from "telegraf";

export const chartMiddleware = async (ctx: ContextMessageUpdate) => {
    const text = 'chart';
    ctx.reply(text);
};
