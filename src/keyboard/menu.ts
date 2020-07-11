import { CallbackButton, Markup } from "telegraf";

export const standartMenu = (): CallbackButton[] => {
  return [
    'Statistics', 'Chart', 'About', 'Subscribe', 'Unsubscribe'
  ].map(item => Markup.callbackButton(item, `/${item.toLowerCase()}`));
};
