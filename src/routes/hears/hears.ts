import { ContextMessageUpdate } from "telegraf";
import { Message } from "telegraf/typings/telegram-types";

/*
	Here should be hears for bot-app.
*/
interface IHear {
  route: string;
  middelware(context: ContextMessageUpdate): Message;
}
