import React from 'react';
import BasicCard from '../card/card';
import ModalCard from '../modalCard/modalCard';
import Task from '../../modele/task';
import styles from './table.module.css';
import { Droppable} from "react-beautiful-dnd";


interface TableInterface {
  id: string, cards: Array<Task>, setCards: (idTable: string, idCard: string) => void,
  name: String,
  addCard: (idTable: string, card: Task) => void,

}

export function Table({ addCard, id, cards, setCards, name }: TableInterface) {
  // Déclare une nouvelle variable d'état, qu’on va appeler « count »

  const remove = (index: string) => {
    setCards(id, index);
  }

  return (

    <div>

      <h4>{name}</h4>
      <div>
        <ModalCard idTable={id} addCard={addCard} />
        <Droppable droppableId={id}>
          {(provided) => (
            <div
              id={id}
              className={styles.box}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {cards.map((card,index) => {
                return (
                  <BasicCard index={index} key={card.getId()} remove={remove} cardId={card.getId()} title={card.getTitle()} description={card.getDescription()}></BasicCard>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div >
  );
}