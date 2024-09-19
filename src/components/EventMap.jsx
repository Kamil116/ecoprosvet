import React, {useEffect, useState} from 'react';
import {ComposableMap, Geographies, Geography, Marker} from 'react-simple-maps';
import {Grid, Paper, Typography, List, ListItem, ListItemText} from '@mui/material';
import EventDetails from './EventDetails';
import {db} from '../firebaseConfig';
import {collection, getDocs, doc, updateDoc, query, where} from 'firebase/firestore';
import './EventMap.css';

const geoUrl = 'https://raw.githubusercontent.com/zarkzork/russia-topojson/master/moscow.json';

export default function EventMap() {
    const [events, setEvents] = useState([]); // Use imported data
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollectionRef = collection(db, "events");
            const querySnapshot = await getDocs(eventsCollectionRef);
            const eventsData = querySnapshot.docs.map(doc => doc.data());
            setEvents(eventsData);
        };

        fetchEvents();
    }, []);

    const updateCheckedInStatus = async (eventId, checkedInStatus) => {
    try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("id", "==", eventId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const eventDoc = querySnapshot.docs[0];
            const eventDocRef = eventDoc.ref;

            // Update the checkedIn status
            await updateDoc(eventDocRef, { checkedIn: checkedInStatus });

            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event.id === eventId ? { ...event, checkedIn: checkedInStatus } : event
                )
            );
            console.log("Всё хорошо");
        } else {
            console.error("Всё плохо");
        }
    } catch (error) {
        console.error("Всё очень плохо, и вот почему: ", error);
    }
};

    const handleMarkerClick = (event) => {
        setSelectedEvent(event);
        setOpen(true);
    };

    const handleEventClick = (event) => {
        setOpen(true);
        setSelectedEvent(event);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEvent(null);
    };

    const handleConfirm = () => {
        if (selectedEvent) {
            updateCheckedInStatus(selectedEvent.id, true);
        }
        console.log(selectedEvent)
        handleClose();
    };

    const handleCancel = () => {
        if (selectedEvent) {
            updateCheckedInStatus(selectedEvent.id, false);
        }
        handleClose();
    };

    return (
        <div className="event-map">
            <Grid container spacing={2} style={{height: '100vh', padding: '20px'}}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} style={{padding: '20px', height: '100%', overflowY: 'auto'}}>
                        <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
                            ЭКОМЕРОПРИЯТИЯ МОСКВЫ
                        </Typography>
                        <List>
                            {events.map((event) => (
                                <ListItem
                                    key={event.id}
                                    button
                                    onClick={() => handleEventClick(event)}
                                    style={{
                                        backgroundColor:
                                            event.checkedIn ? 'lightgreen' : 'inherit',
                                        marginBottom: '10px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <ListItemText
                                        primary={event.title}
                                        secondary={`${event.date} - ${event.location}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper elevation={3} style={{padding: '20px', height: '100%', overflow: 'hidden'}}>
                        <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
                            КАРТА СОБЫТИЙ
                        </Typography>
                        <ComposableMap
                            projection="geoMercator"
                            projectionConfig={{
                                scale: 30000,
                                center: [37.62, 55.75],
                            }}
                            style={{width: '100%', height: '100%'}}
                        >
                            <Geographies geography={geoUrl}>
                                {(geographies) =>
                                    geographies.geographies.map((geo) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="#EAEAEC"
                                            stroke="#D6D6DA"
                                            style={{
                                                hover: {
                                                    fill: '#FF331F',
                                                }
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>

                            {events.map((event) => (
                                <Marker
                                    key={event.id}
                                    coordinates={event.coordinates}
                                    onClick={() => handleMarkerClick(event)}
                                >
                                    <circle r={6} fill={event.checkedIn ? 'green' : 'red'} stroke="gray"
                                            strokeWidth={2}/>
                                    <text
                                        textAnchor="middle"
                                        y={-10}
                                        style={{fontSize: '12px', fill: '#5D5A6D'}}
                                    >
                                        {event.title}
                                    </text>
                                </Marker>
                            ))}
                        </ComposableMap>
                    </Paper>
                </Grid>
            </Grid>

            <EventDetails
                open={open}
                onClose={handleClose}
                selectedEvent={selectedEvent}
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
            />
        </div>
    );
}
