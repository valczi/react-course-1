import React from 'react';
import BasicCard from '../card/card';
import Task from '../../modele/task';
import styles from './table.module.css';
import Button from '@mui/material/Button';

interface TableInterface {
  id:string,cards: Array<Task>, setCards: (idTable:string,idCard:string) => void,
   name: String,
   moveCard :(idTable: string,idTableTarget :string , idCard: string)=>void,
   addCard :(idTable:string,card:Task)=>void,

}

export function Table({ addCard , id, cards, setCards, name, moveCard }: TableInterface) {
  // Déclare une nouvelle variable d'état, qu’on va appeler « count »

  const drop = (e: any) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('cardId');
    const source = e.dataTransfer.getData('tableSourceId');
    const card = document.getElementById(card_id);
    if (card  && e.target.className === "table_box__wjrGo"){
     // console.log(e);
      moveCard(source,id,card_id);
    }

  }

  const dragOver = (e: any) => {
    e.preventDefault();
  }

  const dragEnd = (e: any) => {
    console.log('END ICI END');
  }

  const dragStart = (e: any) => {
    e.dataTransfer.setData('tableSourceId', id);
  }


  const remove = (index: string) => {
    setCards(id,index);
  }

  return (
    <div
      onDrop={drop}
      onDragStart={dragStart}
      onDragOver={dragOver}
      onDragEnd={dragEnd}
    >
      <h4>{name}</h4>
      <Button variant="outlined" color="primary"
            onClick={() => {
              addCard(id,new Task("Salut j'suis super sympa","Ah mais oui c'est vrai"));
            }}
          >
            +
          </Button>
      <div id={id} className={styles.box}>
        {cards.map(card => {
          return (
            <BasicCard key={card.getId()} remove={remove} cardId={card.getId()} title={card.getTitle()} description={card.getDescription()}></BasicCard>
          )
        })}
      </div>
    </div>
  );
}