/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Table } from './composant/table/table';
import Task from './modele/task';
import TableMetier from './modele/table';
import ButtonAppBar from './composant/appbar/appbar';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

let task1 = new Task('Faire a mangé', "Je suis une raclette");
let task2 = new Task('Se laver', 'En gros faut prendre une douche');
let task3 = new Task('Faire les courses', 'Tah les magasins et tout');

let task4 = new Task('qszdfwsdcw', "Je suis dfwsdfune raclette");
let task5 = new Task('qzefqzef', 'En gros wsdfwsfaut prendre une douche');
let task6 = new Task('wsdfwsdfs', 'Tah lessdfwsdf magasins et tout');

let table = new TableMetier("A faire");
table.addTask(task1, task2, task3);

let table2 = new TableMetier("En Cours");
table2.addTask(task4, task5);

let table3 = new TableMetier("Terminado");
table3.addTask(task6);



export default () => {

    const [myTables, setTables] = useState<TableMetier[]>([table, table2, table3]);
    //const [cards, setCards] = useState<Task[]>(tasks);
    //const [cards2, setCards2] = useState<Task[]>(tasks2);


    const addTable = (Name: string) => {
        if (myTables) {
            myTables.push(new TableMetier(Name));
            let newMyTables = new Array<TableMetier>();
            myTables.forEach(table => {
                newMyTables.push(table);
            })
            setTables(newMyTables);
        }
    }

    const setCards = (idTable: string, idCard: string) => {
        let result = myTables.find(element => element.getId() === idTable);
        let poz = null;
        if (result) {
            poz = myTables.indexOf(result);
            result.setTasks(result.getTasks().filter(card => {
                return card.getId() !== idCard;
            }));
            myTables[poz] = result;
            let newMyTables = new Array<TableMetier>();
            myTables.forEach(table => {
                newMyTables.push(table);
            })
            setTables(newMyTables);
        }
        // console.log(myTables);
    }

    const MoveCards = (idTable: string, idTableTarget: string, idCard: string, cardPosition:number) => {
/*
        console.log('ID CARD ' + idCard);
        console.log('ID TARGET ' + idTableTarget);
        console.log('ID TABLE ' + idTable);
*/
        let tablePerdante = myTables.find(element => element.getId() === idTable);
        let tableGagnante = myTables.find(element => element.getId() === idTableTarget);
        let pozPerdant = null;
        let pozGagnant = null;
        if (tablePerdante && tableGagnante) {
            pozPerdant = myTables.indexOf(tablePerdante);
            pozGagnant = myTables.indexOf(tableGagnante);
            let cardTempo = null;

            tablePerdante.setTasks(tablePerdante.getTasks().filter(card => {
                if (card.getId() === idCard) {
                    cardTempo = card;
                }
                return card.getId() !== idCard;
            }));
            if (cardTempo) {
                tableGagnante.addTaskAt(cardPosition,cardTempo);
                myTables[pozPerdant] = tablePerdante;
                myTables[pozGagnant] = tableGagnante;
                let newMyTables = new Array<TableMetier>();
                myTables.forEach(table => {
                    newMyTables.push(table);
                })
                setTables(newMyTables);
                console.log(newMyTables);
            }
        }

        // console.log(myTables);

    }

    function onDragEnd(result: DropResult) {
        console.log(result);
        let { source, destination, draggableId } = result;
        if (!destination)
            return;

        let idTable = source.droppableId;
        let idTableTarget = destination.droppableId;

        MoveCards(idTable, idTableTarget, draggableId,destination.index);


        //MoveCards(,,)
    }

    let addCard = (idTable: string, card: Task) => {
        let result = myTables.find(element => element.getId() === idTable);
        let poz = null;
        if (result) {
            poz = myTables.indexOf(result);
            result.addTask(card);
            myTables[poz] = result;
            let newMyTables = new Array<TableMetier>();
            myTables.forEach(table => {
                newMyTables.push(table);
            })
            setTables(newMyTables);
        }
        // console.log(myTables);
    }

    return (
        <div>
            <ButtonAppBar addTable={addTable} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} className="App">
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        myTables.map(table => {
                            return <Table addCard={addCard} key={table.getId()} name={table.getTitle()} cards={table.getTasks()} setCards={setCards} id={table.getId()} />;
                        })
                    }
                </DragDropContext>
            </div>
        </div>
    )

}
