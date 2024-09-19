import React, {useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Container,
    Typography
} from '@mui/material';
import AdminPanel from "./AdminPanel";
import EventCell from "./EventCell";

export default function ManageEvents() {
    const [events, setEvents] = useState([
        {id: 1, name: 'Событие 1', date: '2024-10-10'},
        {id: 2, name: 'Событие 2', date: '2024-11-11'},
    ]);

    const handleDelete = (id) => {
        setEvents(events.filter((event) => event.id !== id));
    };

    const handleEdit = (id) => {
        const eventName = prompt("Изменить название:");
        const eventDate = prompt("Изменить дату:", "YYYY-MM-DD");

        if (eventName && eventDate) {
            setEvents(events.map((event) =>
                event.id === id ? {...event, name: eventName, date: eventDate} : event
            ));
        }
    };

    return (
        <>
            <AdminPanel/>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    Manage Events
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell>Event Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((evnt) => (
                                <EventCell
                                    name={evnt.name}
                                    date={evnt.date}
                                    id={evnt.id}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                    key={evnt.id}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};
