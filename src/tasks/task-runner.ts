import { TaskStatisticSubscription } from './task-stat-subscription';
export interface ITask {
  taskName: string;
  duration: number;
  task(): void;
  run(): void;
}

interface ITaskRunner {
  tasks: ITask[];
  runTasks(): boolean;
}

export class TaskRunner implements ITaskRunner {
  tasks: ITask[] = [new TaskStatisticSubscription()];

  runTasks(): boolean {
    try {
      for (const task of this.tasks) {
        console.log(`Task ${task.taskName} with duration ${task.duration} run.`);
        task.run();
      }
      return true;
    } catch (e) {
      console.log(`Runner failed`);
      return false;
    }
  }
}