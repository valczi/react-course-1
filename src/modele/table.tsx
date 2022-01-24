import { v4 as uuidv4 } from 'uuid';
import Task from './task';

export default class Table {
  private title: string;
  private tasks: Array<Task>;
  private id: string;

  constructor(title: string) {
    this.title = title;
    this.tasks = new Array<Task>();
    this.id = uuidv4();
  }

  getTitle(): string {
    return this.title;
  }

  addTask(...Tasks: Task[]): void {
    Tasks.forEach(task=>{
      this.tasks.push(task);
    })
  }

  addTaskAt(poz:number,Task: Task): void {
    this.tasks.splice(poz, 0, Task);
  }

  getTasks():Task[]{
    return this.tasks;
  }

  setTasks( Tasks:Array<Task>):void{
     this.tasks=Tasks;
  }


  getId(): string {
    return this.id;
  }
}
