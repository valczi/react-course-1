import React from 'react';
import BasicCard from '../card/card';
import ModalCard from '../modalCard/modalCard';
import Filters from '../filters/filters';
import Task from '../../modele/task';
import { Droppable } from "react-beautiful-dnd";
import Button from '@mui/material/Button';
import { Draggable } from "react-beautiful-dnd";

interface TableInterface {
  id: string, cards: Array<Task>, setCards: (idTable: string, idCard: string) => void,
  name: String,
  addCard: (idTable: string, card: Task) => void,
  removeTable: (idTable: string) => void,
  modifyCard: (idTable: string, card: Task) => void,
  filterBy:  (idTable: string,filter:string) => void,
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightgreen' : 'lightgrey',
  padding: 15,
  margin: 8,
  width: 300,
})
const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  // styles we need to apply on draggables
  return { ...draggableStyle, marignBottom: 20 }
};

export function Table({ filterBy, modifyCard, removeTable, addCard, id, cards, setCards, name }: TableInterface) {

  const remove = (index: string) => {
    setCards(id, index);
  }

  return (

    <div>
      <h4>{name}</h4>
      <div>
        <ModalCard idTable={id} addCard={addCard} />
        <Filters idTable={id} filterBy={filterBy} />
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              style={getListStyle(snapshot.isDraggingOver)}
              //className={styles.box}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {cards.map((card, index) => {
                return (
                  <Draggable
                    key={card.getId()}
                    draggableId={card.getId()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <BasicCard
                          idTable={id}
                          modifyCard={modifyCard}
                          index={index}
                          key={card.getId()}
                          remove={remove}
                          card={card}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)} />
                      </div>
                    )}
                  </Draggable>

                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <Button variant="outlined" color="error"
        onClick={() => {
          removeTable(id);
        }}
      >
        Delete
      </Button>
    </div >
  );
}