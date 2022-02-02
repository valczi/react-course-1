import React from 'react';
import Task from '../../modele/task';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface modalCard {
    idTable: string,
    addCard: (idTable: string, card: Task) => void,
}



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
export default function BasicModal({ idTable, addCard }: modalCard) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const name = React.createRef<HTMLInputElement>();
    const desc = React.createRef<HTMLInputElement>();

    const add = () => {

        if (name.current && desc.current) {
            let nameValue = name.current.value;
            let descValue = desc.current.value;

            if (nameValue && descValue)
                if (nameValue !== "" && descValue !== "") {
                    //console.log("VALUE : "+nameValue);
                    //addCard(idTable, new Task(nameValue, descValue));
                    name.current.value = "";
                    desc.current.value = "";
                    handleClose();
                }
        }

    }


    return (
        <div>
            <Button style={{ marginBottom: 20 }} variant="outlined" onClick={handleOpen}>+</Button>
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
                            label="Name"
                            inputRef={name}
                        />
                        <TextField
                            sx={{ m: 2, width: 0.9 }}
                            required
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            inputRef={desc}
                        />
                    </div>
                    <Button variant="outlined" onClick={add}>+</Button>
                </Box>
            </Modal>
        </div>
    );
}


