import { ContextMessageUpdate } from 'telegraf';
import { Report } from './../models/statistics';

interface ISubscriber {
  subscribed: boolean;
  ctx: ContextMessageUpdate;
  subOn(): boolean;
  subOff(): boolean;
  sendReport(report: Report): Promise<void>;
}

class Subscriber implements ISubscriber {
  subscribed: boolean = false;
  ctx: ContextMessageUpdate;

  constructor(ctx: ContextMessageUpdate) {
    this.ctx = ctx;
  }

  subOn() {
    this.subscribed = true;
    return this.subscribed;
  }

  subOff() {
    this.subscribed = false;
    return this.subscribed;
  }

  async sendReport(report: Report) {
    await this.ctx.reply('You have subscription for COVID19 stats updates.');
    await this.ctx.reply(report);
  }
}