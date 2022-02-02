import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


interface modalCard {
    filterBy:  (idTable: string,filter:string) => void,
    idTable:string,
}


const options = ['Date debut', 'Date fin'];



export default function Filters({filterBy,idTable}:modalCard) {
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const filter = (valueNow: string) => {
        console.log(valueNow.replace(' ', '_').toLocaleLowerCase());
        filterBy(idTable,valueNow.replace(' ', '_').toLocaleLowerCase());
    }

    return (
        <div>
            <Autocomplete
                value={value}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    if (newInputValue) {
                        setInputValue(newInputValue);
                        filter(newInputValue);
                    }
                }}
                onChange={(event, newValue) => {
                    if (newValue) {
                        setValue(newValue);
                    }
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300, m: 2 }}
                renderInput={(params) => <TextField {...params} label="Filter" />}
            />
        </div>
    );
}
