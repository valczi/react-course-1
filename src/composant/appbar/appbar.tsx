import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';


interface ButtonAppBarInterface {
  addTable: (Name: string) => void,
}

export default function ButtonAppBar({ addTable }: ButtonAppBarInterface) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const name = React.createRef<HTMLInputElement>();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'

  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit"
            onClick={handleOpen}
          >Nouvelle Liste</Button>
        </Toolbar>
      </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Task :
          </Typography>
          <div id="modal-modal-description" >
            <TextField
              sx={{ m: 2, width: 0.9 }}
              required
              id="outlined-required"
              label="Titre de la liste"
              inputRef={name}
            />
          </div>
          <Button variant="outlined" onClick={()=>{
            if(name.current)
              addTable(name.current.value);
              handleClose();
          }}>+</Button>
        </Box>
      </Modal>
    </Box>


  );
}