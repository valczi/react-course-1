import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ModalCard from '../modalCard/modalCard';
import Task from '../../modele/task';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dateformat from 'dateformat';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



interface BasicCardInterface {
  idTable: string,
  card: Task,
  remove: any,
  index: number,
  style: any,
  modifyCard: (idTable: string, card: Task) => void,
}

const design = {
  m: 'auto',
  p: 1.5,
  width: 0.35,
  border: 'solid 1px',
  borderRadius: 2,
  font: 14,
}

const textDesign = {
  m: 2,
}

const assignedTo = {
  m: 1,
  marginLeft: 10,
}


export default function BasicCard({ idTable, modifyCard, index, card, remove, style }: BasicCardInterface) {

  let dateFin = card.getDateFin();
  let styleDate = {};

  if (card.getDone()) {
    styleDate = {
      marginBottom: 2,
      border: 'solid 2px #42f56f'
    }
  } else if (dateFin < new Date())
    styleDate = {
      marginBottom: 2,
      border: 'solid 2px #ff1241'
    }
  else
    styleDate = {
      marginBottom: 2,
    }

  const handleChange = (event: any, checked: boolean) => {
    console.log(checked);
    card.setDone(checked);
    modifyCard(idTable,card);
  }

  return (
    <Card id={card.getId()} sx={styleDate} >

      <CardContent sx={{
        borderBottom: 'solid 1px #c2c2c2'
      }}>

        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {card.getTitle()}
        </Typography>




        <Typography sx={textDesign} variant="body2">
          {card.getDescription()}
        </Typography>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '2px',
        }}>
          <Typography sx={design} variant="body1">
            {dateformat(card.getDateDebut(), "m/dd/yyyy")}
          </Typography>
          <Typography sx={design} variant="body1">
            {' ' + dateformat(card.getDateFin(), "m/dd/yyyy")}
          </Typography>
        </div>
        <div style={{
          display: 'Flex',
          justifyContent: 'space-around'
        }}>
          <FormControlLabel control={<Checkbox checked={card.getDone()}/>} onChange={handleChange} label="Done" sx={{ p: 1 }} />
          <Typography sx={assignedTo} color="text.secondary" variant="body2">
            {"Assigné à : " + card.getAttachedTo()}
          </Typography>
        </div>
      </CardContent>
      <CardActions sx={{
        display: 'flex',
        justifyContent: 'space-around',
        m: 1
      }}>
        <Button variant="outlined" color="error"
          onClick={() => {
            remove(card.getId());
          }}
        >
          Delete
        </Button>
        <ModalCard card={card} idTable={idTable} addCard={modifyCard} />
      </CardActions>
    </Card >
  );
}