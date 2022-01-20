/* eslint-disable import/no-anonymous-default-export */
import React , { useState }from 'react';
import {Table} from './composant/box/table';
import Task from './modele/task';
import Button from '@mui/material/Button';
import ButtonAppBar from './composant/appbar/appbar';

let task1 = new Task('Faire a mangé',"Je suis une raclette");
let task2 = new Task('Se laver','En gros faut prendre une douche');
let task3 = new Task('Faire les courses','Tah les magasins et tout');

let tasks=new Array<Task>();

tasks.push(task1,task2,task3);

export default () => {

    const [cards,setCards] = useState<Task[]>(tasks);

   return( 
    <div>       
        <ButtonAppBar/>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}} className="App">
        <Table cards={cards} setCards={setCards}/>
        <Table cards={cards} setCards={setCards}/>
        <Table cards={cards} setCards={setCards}/>
        </div>
    </div>
    )

}
