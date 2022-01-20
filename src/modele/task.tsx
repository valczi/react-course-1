import { v4 as uuidv4 } from 'uuid';


export default class Task {
    private title: string;
    private description: string;
    private id:string;
   
    constructor(title: string,description: string) {
      this.title = title;
      this.description = description;
      this.id=uuidv4();
    }
   
    getTitle(): string{
        return this.title;
    }

    getDescription(): string{
        return this.description;
    }

    getId():string{
      return this.id;
    }
  }
   