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
  subs: Map<number, Subscriber>;
  attach(sub: Subscriber): Subscriber;
  detach(sub: Subscriber): Map<number, Subscriber>;
  sendReports(report: Report): void;
}

export class Subscriber implements ISubscriber {
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
      console.error('Are you sure that report was provided?');
      return;
    };
    await this.ctx.reply('You have subscription for COVID19 stats updates.');
    await this.ctx.reply(report);
  }
}

class ReportSubject implements ISubject {
  subs = new Map<number, Subscriber>();

  attach(sub: Subscriber): Subscriber {
    const subId = sub.ctx && sub.ctx.from && sub.ctx.from.id;
    if (subId) this.subs.set(subId, sub);
    return sub;
  }

  detach(sub: Subscriber): Map<number, Subscriber> {
    const subId = sub.ctx && sub.ctx.from && sub.ctx.from.id;
    if (subId) this.subs.delete(subId);
    return this.subs;
  }

  sendReports(report: Report): void {
    if (!this.subs.size) return;
    this.subs.forEach((_, key: number) => {
      const sub = this.subs.get(key);
      if (sub) {
        sub.sendReport(report);
      }
    })
  }
}

export const subject = new ReportSubject();
