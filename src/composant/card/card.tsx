import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './card.module.css'
import { Draggable } from "react-beautiful-dnd";


interface BasicCardInterface {
  title: string,
  description: string,
  remove: any,
  cardId: string,
  index: number,
}

export default function BasicCard({ index, title, description, remove, cardId }: BasicCardInterface) {

  return (
    <div
    >
      <Draggable draggableId={cardId} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card id={cardId} className={styles.card} sx={{ minWidth: 275 }}>
              <CardContent >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2">
                  {description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="error"
                  onClick={() => {
                    remove(cardId);
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </div>
        )}

      </Draggable>
    </div>
  );
}