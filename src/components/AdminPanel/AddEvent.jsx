import React, {useState} from 'react';
import {TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import AdminPanel from "./AdminPanel";

export default function AddEvent() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventType, setEventType] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Event created:", eventName, eventDate, eventType);
        setEventName('');
        setEventDate('');
    };

    function addEventToStorage(data) {

    }


    const handleChange = (event) => {
        // setAge(event.target.value);
        console.log(event.target);
    };


    return (
        <>
            <AdminPanel/>
            <Container maxWidth="sm">
                <Typography variant="h4" gutterBottom>
                    Добавить событие
                </Typography>
                <Box component="form" onSubmit={handleSubmit}
                     sx={{display: 'flex', flexDirection: 'column', gap: '25px'}}>
                    <TextField
                        label="Название"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Дата"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                    <FormControl fullWidth required>
                        <InputLabel id="event-type-select-label">Тип события</InputLabel>
                        <Select
                            labelId="event-type-select-label"
                            id="event-type-select"
                            value={eventType}
                            label="Тип события"
                            onChange={handleChange}
                        >
                            <MenuItem value="eco-lecture">Eco Lecture</MenuItem>
                            <MenuItem value="forest-digging">Forest Digging</MenuItem>
                            <MenuItem value="cleanup">Cleanup</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Create Event
                    </Button>
                </Box>
            </Container>
        </>
    );
};
