import React, {useState} from 'react';
import {TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import AdminPanel from "./AdminPanel";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebaseConfig";

export default function AddEvent() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventType, setEventType] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        const eventId = Date.now(); // Timestamp = uniq ID

        const eventData = {
            id: eventId,
            title: eventName,
            date: eventDate,
            location: location,
            coordinates: [parseFloat(coordinates.lng), parseFloat(coordinates.lat)],
            description: description,
            eventType: eventType,
        };

        addEventToApproval(eventData);

        setEventName('');
        setEventDate('');
        setEventType('');
        setLocation('');
        setDescription('');
        setCoordinates({ lat: '', lng: '' });
    };

    async function addEventToApproval(eventData) {
        try {
            const docRef = await addDoc(collection(db, 'approval'), eventData);
            console.log("Document written with ID: ", docRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    const handleChange = (event) => {
        setEventType(event.target.value)
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
                    <TextField
                        label="Место проведения"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <TextField
                        label="Широта"
                        value={coordinates.lat}
                        onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })}
                        required
                    />
                    <TextField
                        label="Долгота"
                        value={coordinates.lng}
                        onChange={(e) => setCoordinates({ ...coordinates, lng: e.target.value })}
                        required
                    />
                    <TextField
                        label="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                            <MenuItem value="lecture">Лекция</MenuItem>
                            <MenuItem value="cleaning_day">Субботник</MenuItem>
                            <MenuItem value="other">Другое</MenuItem>
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
