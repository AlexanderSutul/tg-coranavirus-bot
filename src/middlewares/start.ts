import {ContextMessageUpdate, Extra, Markup} from "telegraf";
import {standartMenu} from "../keyboard/menu";

export const startMiddleware = async (ctx: ContextMessageUpdate) => {
    const buttons = standartMenu();
    ctx.reply(
        'Hello! Please, press the button you need',
        Extra.HTML().markup((m: Markup) => m.keyboard(buttons, {columns: 1, setResizeKeyboard: true})))
};
