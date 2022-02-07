/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Table } from './composant/table/table';
import Task from './modele/task';
import TableMetier from './modele/table';
import ButtonAppBar from './composant/appbar/appbar';
import { DragDropContext, DropResult } from "react-beautiful-dnd";


let task1 = new Task('Faire a mangé', "Je suis une raclette",new Date(),new Date("2080-12-12"),"Khouleman",1);
let task2 = new Task('Se laver', 'En gros faut prendre une douche',new Date(),new Date(),"P-J",3);
let task3 = new Task('Faire les courses', 'Tah les magasins et tout',new Date(),new Date("2025-12-09"),"Chris",4);

let task4 = new Task('MAGICIEN', "Je suis une raclette",new Date(),new Date("2022-05-05"),"Eric",5);
let task5 = new Task('je pue', 'En gros faut prendre une douche',new Date(),new Date("2023-02-01"),"Allan",2);
let task6 = new Task('Course', 'Tah les auchans et tout',new Date("2021-02-09"),new Date(),"Flo",2);
task6.setDone(true);

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

    const sortByDateDeb = (idTable: string) => {
        let result = myTables.find(element => element.getId() === idTable);
        if (result) {
            let resultSorted = result.getTasks().sort((taska, taskb) => {
                return taska.getDateDebut().getTime() - taskb.getDateDebut().getTime()
            }
            );
            myTables[myTables.indexOf(result)].setTasks(resultSorted);
            let newMyTables = new Array<TableMetier>();
            myTables.forEach(table => {
                newMyTables.push(table);
            })
            setTables(newMyTables);
        }
    }

    const sortByDateFin = (idTable: string) => {
        let result = myTables.find(element => element.getId() === idTable);
        if (result) {
            let resultSorted = result.getTasks().sort((taska, taskb) => {
                return taska.getDateFin().getTime() - taskb.getDateFin().getTime()
            }
            );
            myTables[myTables.indexOf(result)].setTasks(resultSorted);
            let newMyTables = new Array<TableMetier>();
            myTables.forEach(table => {
                newMyTables.push(table);
            })
            setTables(newMyTables);
        }
    }

    const sortByDatePriority = (idTable: string) => {
        let result = myTables.find(element => element.getId() === idTable);
        if (result) {
            let resultSorted = result.getTasks().sort((taska, taskb) => {
                return taska.getPriority() - taskb.getPriority()
            }
            );
            myTables[myTables.indexOf(result)].setTasks(resultSorted);
            let newMyTables = new Array<TableMetier>();
            myTables.forEach(table => {
                newMyTables.push(table);
            })
            setTables(newMyTables);
        }
    }

    const Filter = (idTable: string, filter: string) => {
        switch (filter) {
            case 'date_debut':
                sortByDateDeb(idTable);
                //console.log("Tri par date debut");
                break;
            case 'date_fin':
                sortByDateFin(idTable);
                //console.log("Tri par date debut");
                break;
            case 'priorite':
                sortByDatePriority(idTable);
                //console.log("Tri par date debut");
                break;
            default:
                //console.log("Filtre inconnu"); break;
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

    const MoveCards = (idTable: string, idTableTarget: string, idCard: string, cardPosition: number) => {
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
                tableGagnante.addTaskAt(cardPosition, cardTempo);
                myTables[pozPerdant] = tablePerdante;
                myTables[pozGagnant] = tableGagnante;
                let newMyTables = new Array<TableMetier>();
                myTables.forEach(table => {
                    newMyTables.push(table);
                })
                setTables(newMyTables);
                //console.log(newMyTables);
            }
        }

        // console.log(myTables);

    }

    function onDragEnd(result: DropResult) {
        //console.log(result);
        let { source, destination, draggableId } = result;
        if (!destination)
            return;

        let idTable = source.droppableId;
        let idTableTarget = destination.droppableId;

        MoveCards(idTable, idTableTarget, draggableId, destination.index);


        //MoveCards(,,)
    }

    let removeTable = (idTable: String): void => {
        let result = myTables.find(element => element.getId() === idTable);
        let poz = -1;
        if (result)
            poz = myTables.indexOf(result);
        if (poz !== -1) {
            myTables.splice(poz, 1);
            let newMyTables = new Array<TableMetier>();
            myTables.forEach(table => {
                newMyTables.push(table);
            })
            setTables(newMyTables);
            //console.log(newMyTables);

        }
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

    let modifyCard = (idTable: string, card: Task) => {
        let result = myTables.find(element => element.getId() === idTable);
        if (result) {
            result.modifyTask(card);
            let newMyTables = new Array<TableMetier>();
            myTables.forEach(table => {
                newMyTables.push(table);
            })
            setTables(newMyTables);
        }
    }

    return (
        <div>
            <ButtonAppBar addTable={addTable} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        myTables.map(table => {
                            return <Table filterBy={Filter} modifyCard={modifyCard} removeTable={removeTable} addCard={addCard} key={table.getId()} name={table.getTitle()} cards={table.getTasks()} setCards={setCards} id={table.getId()} />;
                        })
                    }
                </DragDropContext>
            </div>
        </div>
    )

}
