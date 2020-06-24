import {CallbackButton, Markup} from "telegraf";

export const standartMenu = (): CallbackButton[] => {
    return [
        'Statistics', 'Chart', 'About'
    ].map(item => Markup.callbackButton(item, `/${item.toLowerCase()}`));
};
