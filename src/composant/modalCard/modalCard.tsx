import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Task from '../../modele/task';
import dateformat from 'dateformat';

interface modalCard {
    idTable: string,
    addCard: (idTable: string, card: Task) => void,
    card?: Task,
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

export default function BasicModal({ card, idTable, addCard }: modalCard) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const name = React.createRef<HTMLInputElement>();
    const desc = React.createRef<HTMLInputElement>();
    const dateDepart = React.createRef<HTMLInputElement>();
    const dateFinis = React.createRef<HTMLInputElement>();
    const attribueA = React.createRef<HTMLInputElement>();
    let defaultName = '';
    let defaultDesc = '';
    let defaultDateDebut = '2020-12-12';
    let defaultDateFin = '2021-12-12';
    let defaultAssignedTo = '';
    let logo = '+';
    let logoOpen = 'Add';

    if (card) {

        defaultName = card.getTitle();
        defaultDesc = card.getDescription();
        defaultDateDebut = dateformat(card.getDateDebut(), "yyyy-m-dd");
        defaultDateFin = dateformat(card.getDateFin(), "yyyy-m-dd");
        logo = 'Validate';
        logoOpen = 'Edit'
    }

    const add = () => {
        if (name.current && desc.current && dateDepart.current && dateFinis.current && attribueA.current) {
            let nameValue = name.current.value;
            let descValue = desc.current.value;

            let dateDebut = dateDepart.current.value;
            let dateFin = dateFinis.current.value;
            let attachedTo = attribueA.current.value;





            if (nameValue && descValue && dateFin && dateDebut && attachedTo)
                if (nameValue !== "" && descValue !== "" && attachedTo !== "") {
                    let dateDeb = new Date(dateDebut);
                    let dateF = new Date(dateFin);



                    if (dateDeb <= dateF) {
                        if (card) {
                            card.setDateDebut(dateDeb);
                            card.setDateFin(dateF);
                            card.setTitle(nameValue);
                            card.setDescription(descValue);
                            card.setAttachedTo(attachedTo);
                            console.log(card);
                            addCard(idTable, card);
                        } else
                            addCard(idTable, new Task(nameValue, descValue, dateDeb, dateF, attachedTo));
                        handleClose();
                    }

                }
        }
    }


    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>{logoOpen}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {logoOpen} :
                    </Typography>
                    <div id="modal-modal-description" >
                        <TextField
                            sx={{ m: 2, width: 0.9 }}
                            required
                            id="outlined-required"
                            label="Name"
                            defaultValue={defaultName}
                            inputRef={name}
                        />
                        <TextField
                            sx={{ m: 2, width: 0.9 }}
                            required
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            defaultValue={defaultDesc}
                            inputRef={desc}
                        />
                        <TextField
                            sx={{ m: 2, width: 0.41 }}
                            id="date"
                            label="Date début"
                            type="date"
                            defaultValue={defaultDateDebut}
                            inputRef={dateDepart}
                        />

                        <TextField
                            sx={{ m: 2, width: 0.41 }}
                            id="date"
                            label="Date fin"
                            type="date"
                            defaultValue={defaultDateFin}
                            inputRef={dateFinis}
                        />
                        <TextField
                            sx={{ m: 2, width: 0.9 }}
                            required
                            id="outlined-required"
                            label="Attribuer a :"
                            defaultValue={defaultAssignedTo}
                            inputRef={attribueA}
                        />
                    </div>
                    <Button variant="outlined" onClick={add}>{logo}</Button>
                </Box>
            </Modal>
        </div>
    );
}


