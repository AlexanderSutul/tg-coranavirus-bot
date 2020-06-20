import {ContextMessageUpdate} from "telegraf";

export const chartMiddleware = async (ctx: ContextMessageUpdate) => {
    const host = 'https://upload.wikimedia.org/wikipedia/';
    const pngUrl = host + 'commons/thumb/f/f5/COVID.2019.map.regions_%282020-04-21%29.png/800px-COVID.2019.map.regions_%282020-04-21%29.png';
    await ctx.replyWithPhoto(pngUrl);
};
