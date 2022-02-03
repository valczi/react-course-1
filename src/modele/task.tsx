import { v4 as uuidv4 } from 'uuid';


export default class Task {
  private title: string;
  private description: string;
  private id: string;
  private dateDebut: Date;
  private dateFin: Date;
  private attachedTo: string;
  private done: boolean;
  private priority:number;

  constructor(title: string, description: string, dateDebut: Date, dateFin: Date, attachedTo: string,priority:number) {
    this.title = title;
    this.description = description;
    this.id = uuidv4();
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.attachedTo = attachedTo;
    this.done = false;
    this.priority=priority;
  }

  getPriority(): number {
    return this.priority;
  }

  getTitle(): string {
    return this.title;
  }

  getDone(): boolean {
    return this.done;
  }

  getDescription(): string {
    return this.description;
  }

  getId(): string {
    return this.id;
  }

  getDateDebut(): Date {
    return this.dateDebut;
  }
  getDateFin(): Date {
    return this.dateFin;
  }

  getAttachedTo(): string {
    return this.attachedTo;
  }
  ////////////////
  setTitle(title: string): void {
    this.title = title;
  }

  setDescription(desc: string): void {
    this.description = desc;
  }

  setDateDebut(date: Date): void {
    this.dateDebut = date;
  }
  setDateFin(date: Date): void {
    this.dateFin = date;
  }

  setAttachedTo(Attached: string): void {
    this.attachedTo = Attached;
  }

  setDone(done: boolean): void {
    this.done = done;
  }

  setPriority(prority:number): void {
     this.priority=prority;;
  }

}
