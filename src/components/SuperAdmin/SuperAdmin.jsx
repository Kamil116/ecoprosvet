import React, {useState, useEffect} from 'react';
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
    Typography, Avatar, Box
} from '@mui/material';
import {collection, getDocs, doc, deleteDoc, updateDoc, addDoc} from 'firebase/firestore';
import {db} from '../../firebaseConfig';

function removeEventById(eventsArray, eventId) {
    const newEventsArray = [];
    for (let i = 0; i < eventsArray.length; i++) {
        if (eventsArray[i].id !== eventId) {
            newEventsArray.push(eventsArray[i]);
        }
    }
    return newEventsArray;
}

export default function SuperAdminPage() {
    const [pendingEvents, setPendingEvents] = useState([]);


    useEffect(() => {
        const fetchPendingEvents = async () => {
            const eventsCollection = collection(db, 'approval');
            const eventSnapshot = await getDocs(eventsCollection);
            const eventList = eventSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPendingEvents(eventList);
        };

        fetchPendingEvents();
    }, []); // Runs only once

    const handleApprove = async (event) => {
        const updatedEvents = removeEventById(pendingEvents, event.id);
        setPendingEvents(updatedEvents);
    };

    const handleDecline = async (event) => {
        const updatedEvents = removeEventById(pendingEvents, event.id);
        setPendingEvents(updatedEvents);
    };

    const handleRequestChanges = (eventId, message) => {
        try {
            const eventRef = doc(db, 'approval', eventId);
        } catch (e) {
            console.error('Error: ', e);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Департамент: управление входящими мероприятиями
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Изображение</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell align="center">Дата</TableCell>
                            <TableCell align="center">Локация</TableCell>
                            <TableCell align="center">Описание</TableCell>
                            <TableCell align="center">Тип</TableCell>
                            <TableCell align="center">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingEvents.map((event) => (
                            <TableRow key={event.id}>
                                <Avatar
                                    variant="rounded"
                                    src={event.imageUrl}
                                    alt={event.title}
                                    sx={{width: 56, height: 56}}
                                />
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.date}</TableCell>
                                <TableCell align="center">{event.location}</TableCell>
                                <TableCell align="center" sx={{maxWidth: 200}}>
                                    <Typography variant="body2" noWrap>{event.description}</Typography>
                                </TableCell>

                                <TableCell align="center">{event.eventType}</TableCell>
                                <TableCell align="center">
                                    <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleApprove(event)}
                                        >
                                            Одобрить
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDecline(event)}
                                        >
                                            Отклонить
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => {
                                                const message = prompt("Введите комментарий:");
                                                if (message) {
                                                    handleRequestChanges(event.id, message);
                                                }
                                            }}
                                        >
                                            Доработать
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
