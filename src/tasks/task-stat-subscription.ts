import { subject } from './../services/subscribe.service';
import { ITask } from './task-runner';
import { Statistics } from '../models/statistics';
import { statisticService } from "../services/statistic.service";

export class TaskStatisticSubscription implements ITask {
  name: string = 'task-stat-subscription';
  duration: number = 1000 * 60;

  task = async () => {
    console.log(`Task ${this.name} was invoked.`);

    const {
      getTotalConfirmed,
      getTotalDeath,
      getTotalRecovered,
      getStatisticsByCountries,
    } = statisticService;

    const [
      totalConfirmed, totalDeath, totalRecovered, statisticsByCountries
    ] = await Promise.all([
      getTotalConfirmed(), getTotalDeath(), getTotalRecovered(), getStatisticsByCountries()
    ]);

    const statistics = new Statistics(
      statisticsByCountries, totalConfirmed, totalDeath, totalRecovered
    );

    const report = statistics.getReport();

    subject.sendReports(report);
  }

  run(): boolean {
    setInterval(this.task, this.duration);
    return true;
  }
}
