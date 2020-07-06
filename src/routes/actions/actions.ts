import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { IAction } from './interfaces';
import { BotAction } from './enums';

class ActionLikePandemic implements IAction {
  trigger: string = BotAction.LikePandemic.toString();

  async middleware(ctx: ContextMessageUpdate): Promise<void> {
    await ctx.editMessageText('🎉 I like this output! 🎉');
  }
}

class ActionDislikePandemic implements IAction {
  trigger: string = BotAction.DislikePandemic.toString();

  async middleware(ctx: ContextMessageUpdate): Promise<void> {
    await ctx.editMessageText('How will I live in the future?');
  }
}

const actions: IAction[] = [
  new ActionLikePandemic(),
  new ActionDislikePandemic(),
];

export const actionHandler = (bot: Telegraf<ContextMessageUpdate>) => {
  for (const action of actions) {
    bot.action(action.trigger, action.middleware);
  }
};
