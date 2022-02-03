import React,{useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Task from '../../modele/task';
import dateformat from 'dateformat';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';


const prorities = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
    value: 5,
    label: '5',
    },
    {
    value: 6,
    label: '6',
    },
  ];

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
    console.log('render');
    const [open, setOpen] = React.useState(false);
    const [priority, setPriority] = React.useState(1);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const name = React.createRef<HTMLInputElement>();
    const desc = React.createRef<HTMLInputElement>();
    const dateDepart = React.createRef<HTMLInputElement>();
    const dateFinis = React.createRef<HTMLInputElement>();
    const attribueA = React.createRef<HTMLInputElement>();

    const [settings,setSettings] =React.useState({
        defaultName : '',
        defaultDesc : '',
        defaultDateDebut : '2020-12-12',
        defaultDateFin : '2021-12-12',
        defaultAssignedTo : '',
        logo : '+',
        logoOpen : 'Add',
    })


    useEffect(() => {
        if (card) {
            setSettings({
                defaultName : card.getTitle(),
                defaultDesc : card.getDescription(),
                defaultDateDebut : dateformat(card.getDateDebut(), "yyyy-dd-mm"),
                defaultDateFin : dateformat(card.getDateFin(), "yyyy-dd-mm"),
                defaultAssignedTo : card.getAttachedTo(),
                logo : 'Validate',
                logoOpen : 'Edit',
            })
            setPriority(card.getPriority());
        }
    },[])



    const handleChange=(event:any)=>{
        setPriority(event.target.value);
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
                            addCard(idTable, new Task(nameValue, descValue, dateDeb, dateF, attachedTo,priority));
                        handleClose();
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            //title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1000
                          });
                    }

                }
        }
    }


    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>{settings.logoOpen}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {settings.logoOpen} :
                    </Typography>
                    <div id="modal-modal-description" >
                    <TextField
                        sx={{ m: 2, width: 0.9 }}
                        id="outlined-select-currency"
                        select
                        label="Select"
                        value={priority}
                        onChange={handleChange}
                        helperText="Select prority"
                        >
                        {prorities.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                        <TextField
                            sx={{ m: 2, width: 0.9 }}
                            required
                            id="outlined-required"
                            label="Name"
                            defaultValue={settings.defaultName}
                            inputRef={name}
                        />
                        <TextField
                            sx={{ m: 2, width: 0.9 }}
                            required
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            defaultValue={settings.defaultDesc}
                            inputRef={desc}
                        />
                        <TextField
                            sx={{ m: 2, width: 0.41 }}
                            id="date"
                            label="Date début"
                            type="date"
                            defaultValue={settings.defaultDateDebut}
                            inputRef={dateDepart}
                        />

                        <TextField
                            sx={{ m: 2, width: 0.41 }}
                            id="date"
                            label="Date fin"
                            type="date"
                            defaultValue={settings.defaultDateFin}
                            inputRef={dateFinis}
                        />
                        <TextField
                            sx={{ m: 2, width: 0.9 }}
                            required
                            id="outlined-required"
                            label="Attribuer a :"
                            defaultValue={settings.defaultAssignedTo}
                            inputRef={attribueA}
                        />
                    </div>
                    <Button variant="outlined" onClick={add}>{settings.logo}</Button>
                </Box>
            </Modal>
        </div>
    );
}


