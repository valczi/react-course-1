import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './card.module.css'

interface BasicCardInterface {
  title: string,
  description: string,
  remove: any,
  cardId: string,
}

export default function BasicCard({ title, description, remove, cardId }: BasicCardInterface) {

  const dragStart = (e: any) => {
    const target = e.target;
    e.dataTransfer.setData('cardId', target.id);

    /*setTimeout(() => {
      target.style.display = 'none';
    }, 0)*/
  }

  const dragOver = (e: any) => {
    //console.log(e);
    e.stopPropagation();
  }

  const dragEnd = (e: any) => {
    console.log(e);

  }


  return (
    <div
      id={cardId}
      draggable="true"
      onDragStart={dragStart}
      onDragOver={dragOver}
      onDragEnd={dragEnd}
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
  );
}