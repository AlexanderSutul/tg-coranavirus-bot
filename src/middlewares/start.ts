import { subject, Subscriber } from './../services/subscribe.service';
import { Message } from 'telegraf/typings/telegram-types';
import { ContextMessageUpdate, Extra, Markup } from "telegraf";
import { standartMenu } from "../keyboard/menu";

export const startMiddleware = async (ctx: ContextMessageUpdate): Promise<Message> => {
  const subscriber = new Subscriber(ctx);
  subject.attach(subscriber)
  const buttons = standartMenu();
  const message = await ctx.reply(
    'Hello! Please, press the button you need',
    Extra.HTML().markup((m: Markup) => m.keyboard(buttons, { columns: 1, setResizeKeyboard: true }))
  );

  return message;
};
