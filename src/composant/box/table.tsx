import React from 'react';
import BasicCard from '../card/card';
import Task from '../../modele/task';
import styles from './table.module.css';


interface TableInterface {
  cards: Array<Task>,setCards: (cards: Task[]) => void,
}

export function Table({cards,setCards}:TableInterface) {
  // Déclare une nouvelle variable d'état, qu’on va appeler « count »

 const remove = (index: string) => {
    setCards(cards.filter(card =>{
      return card.getId() !== index;
    }));
}

  return (
    <div>
    <h4>Table x</h4>
    <div className={styles.box}>
      {cards.map(card =>{
        return (
        <BasicCard remove={remove} cardId={card.getId()} title={card.getTitle()} description={card.getDescription()}></BasicCard>
        )
      })}
    </div>
    </div>
  );
}