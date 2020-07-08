import { ContextMessageUpdate } from 'telegraf';
import { Report } from './../models/statistics';

interface ISubscriber {
  subscribed: boolean;
  ctx: ContextMessageUpdate;
  subOn(): boolean;
  subOff(): boolean;
  sendReport(report: Report): Promise<void>;
}

interface ISubject {
  subs: Subscriber[];
  attach(sub: Subscriber): Subscriber;
  detach(sub: Subscriber): Subscriber;
  sendReports(report: Report): void;
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
    if (!report) {
      console.error('report is empty');
      return;
    };
    await this.ctx.reply('You have subscription for COVID19 stats updates.');
    await this.ctx.reply(report);
  }
}

class ReportSubject implements ISubject {
  subs: Subscriber[] = [];

  attach(sub: Subscriber): Subscriber {
    this.subs.push(sub);
    return sub;
  }

  detach(sub: Subscriber): Subscriber {
    const subId = sub.ctx && sub.ctx.from && sub.ctx.from.id;
    this.subs = this.subs.filter(curSub => curSub.ctx.from?.id !== subId);
    return sub;
  }

  sendReports(report: Report): void {
    if (!this.subs.length) return;
    for (const sub of this.subs) {
      sub.sendReport(report);
    }
  }
}