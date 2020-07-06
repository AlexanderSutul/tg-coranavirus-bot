import { ContextMessageUpdate } from "telegraf";

export interface IAction {
  trigger: string;
  middleware(ctx: ContextMessageUpdate): Promise<boolean>;
}
