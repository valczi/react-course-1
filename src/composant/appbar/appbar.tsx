import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Task from '../../modele/task';


interface ButtonAppBarInterface {
  addTable: (Name: string) => void,
}

export default function ButtonAppBar({ addTable }: ButtonAppBarInterface) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit"
            onClick={() => {
              addTable("je suis table :");
            }}
          >Nouvelle Liste</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}