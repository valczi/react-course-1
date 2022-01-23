import {Table} from '../table/table';
import Task from '../../modele/task';
import React , { useState }from 'react';

let task1 = new Task('Faire a mangé',"Je suis une raclette");
let task2 = new Task('Se laver','En gros faut prendre une douche');
let task3 = new Task('Faire les courses','Tah les magasins et tout');

let tasks=new Array<Task>();

tasks.push(task1,task2,task3);

interface BasicCardInterface {
    Tables:Array<Array<Task>>
  }

export default function Board({Tables} : BasicCardInterface) {

    const [cards,setCards] = useState<Task[][]>(Tables);


  return (
   /* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}} className="App">
        {}
        <Table cards={cards} setCards={setCards}/>
    </div>*/
    <p/>

);
}