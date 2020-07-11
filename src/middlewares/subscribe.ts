import { subject, Subscriber } from './../services/subscribe.service';
import { ContextMessageUpdate } from 'telegraf';

export const subscribeMiddleware = async (ctx: ContextMessageUpdate) => {
  const sub = new Subscriber(ctx);
  subject.attach(sub);
  await ctx.reply(`
    current user id: ${sub.ctx.from && sub.ctx.from.id},
    subs: ${subject.subs.size}
  `);
};
