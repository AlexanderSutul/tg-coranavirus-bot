import Telegraf, {ContextMessageUpdate} from "telegraf";

export enum BotAction {
    LikePandemic,
    DislikePandemic
}

interface IAction {
    trigger: string;
    middleware(ctx: ContextMessageUpdate): void;
}

class ActionLikePandemic implements IAction {

    trigger: string = BotAction.LikePandemic.toString();

    async middleware(ctx: ContextMessageUpdate): Promise<void> {
        await ctx.editMessageText('🎉 I love to be at home! 🎉')
    }
}

class ActionDislikePandemic implements IAction {

    trigger: string = BotAction.DislikePandemic.toString();

    async middleware(ctx: ContextMessageUpdate): Promise<void> {
        await ctx.editMessageText('We all will die!')
    }
}

const actions: IAction[] = [
    new ActionLikePandemic(),
    new ActionDislikePandemic()
];

export const actionHandler = (bot: Telegraf<ContextMessageUpdate>) => {
    for (const action of actions) {
        bot.action(action.trigger, action.middleware);
    }
}
