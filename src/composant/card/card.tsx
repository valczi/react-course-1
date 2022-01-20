import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './card.module.css'

interface BasicCardInterface {
    title: string,
    description: string,
    remove:any,
    cardId:string,
  }

export default function BasicCard({title,description,remove,cardId} : BasicCardInterface) {
  return (
    <Card className={styles.card} sx={{ minWidth: 275 }}>
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
  );
}