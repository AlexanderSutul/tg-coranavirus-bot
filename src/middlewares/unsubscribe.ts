import { subject, Subscriber } from '../services/subscribe.service';
import { ContextMessageUpdate } from 'telegraf';

export const unsubscribeMiddleware = async (ctx: ContextMessageUpdate) => {
  const sub = new Subscriber(ctx);
  subject.detach(sub);
  await ctx.reply(`
    removed user id: ${sub.ctx.from && sub.ctx.from.id},
    subs: ${subject.subs.size}
  `);
};
