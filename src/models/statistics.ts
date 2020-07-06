import { Stat } from './stat';
import { formatNumber } from "../helper/helper";

export type Report = string;

export class Statistics {

  stats: Stat[] = [];
  totalConfirmed: number = 0;
  totalDeath: number = 0;
  totalRecovered: number = 0;

  constructor(stats: Stat[], totalConfirmed: number, totalDeath: number, totalRecovered: number) {
    this.stats = stats;
    this.totalConfirmed = totalConfirmed;
    this.totalDeath = totalDeath;
    this.totalRecovered = totalRecovered;
  }

  private generateHeader() {
    let header = '';
    header += `<b>Statistics by countries:</b>\n\n`;
    header += `Total confirmed️️☢️: ${formatNumber(this.totalConfirmed)}\n`;
    header += `Total died⚰️: ${formatNumber(this.totalDeath)}\n`;
    header += `Total recovered💚: ${formatNumber(this.totalRecovered)}\n`;
    header += '\n';
    return header;
  }

  private generateBody() {
    let body = '';
    for (const stat of this.stats) {
      body += `${formatNumber(stat.idx)}. `
        + `${stat.region}`
        + ` ☢️: ${formatNumber(stat.confirmed)}`
        + ` ⚰️: ${formatNumber(stat.death)}`
        + ` 💚: ${formatNumber(stat.recovered)}`
        + `\n`;
    }
    return body;
  }

  getReport(): Report {
    let report = '';
    const header = this.generateHeader();
    const body = this.generateBody();

    report += header;
    report += body;

    return report;
  }

  static useSlicer(report: Report, chunkSize: number = 50): string[] {
    let slicedReport = [];
    let reportParts = '';
    const reportSlices = report.split('\n');

    for (let i = 0; i < reportSlices.length; i++) {
      const countryStat = reportSlices[i];
      reportParts += countryStat + '\n';
      if (i % chunkSize === 0 && i > 0) {
        slicedReport.push(reportParts);
        reportParts = '';
      }
    }

    slicedReport.push(reportParts);

    return slicedReport;
  }
}
