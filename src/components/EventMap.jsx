import React, {useState} from 'react';
import {ComposableMap, Geographies, Geography, Marker} from 'react-simple-maps';
import {
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './EventMap.css';
import EventDetails from "./EventDetails";

const initialEvents = [
    {
        id: 1,
        title: 'Лекция',
        date: '2024-10-01',
        location: 'Парк Горького, Москва',
        coordinates: [37.6017, 55.7158],
        description: 'Познавательная лекция о природе.',
        checkedIn: false,
    },
    {
        id: 2,
        title: 'Субботник',
        date: '2024-10-05',
        location: 'Московский государственный университет',
        coordinates: [37.5408, 55.7033],
        description: 'Участие в субботнике для очистки территории.',
        checkedIn: false,
    },
    {
        id: 3,
        title: 'квест «Вокруг света с Речкиным»',
        date: '2024-09-21',
        location: 'ВДНХ, Москва',
        coordinates: [37.618525, 55.832940],
        description: 'Увлекательный квест по достопримечательностям.',
        checkedIn: false,

    },
    {
        id: 4,
        title: 'ЛЕКЦИЯ «Его высочество – жираф!»',
        date: '2024-10-05',
        location: 'Дарвиновский музей, Москва',
        coordinates: [37.561526, 55.690643],
        description: 'Интересная лекция о жирафах.',
        checkedIn: false,
    },
    {
        id: 5,
        title: 'Обзорная экскурсия в "Лесной сказке"',
        date: '2024-09-21',
        location: "Москва экоцентр «Лесная сказка»",
        coordinates: [37.547459, 55.585118],
        description: 'Экскурсия по экотропам.',
        checkedIn: false,
    },
    {
        id: 6,
        title: 'Тематическое занятие "День леса"',
        date: '2024-09-22',
        location: 'Москва экоцентр «Лесная сказка»',
        coordinates: [37.547459, 55.585118],
        description: 'Тематическое занятие по лесным экосистемам.',
        checkedIn: false,
    }
];

const geoUrl = 'https://raw.githubusercontent.com/zarkzork/russia-topojson/master/moscow.json';

export default function EventMap() {

    const [events, setEvents] = useState(initialEvents);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

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
        console.log('Rejected :(')
    };

    const handleConfirm = () => {
        if (selectedEvent) {
            setEvents(events.map(event =>
                event.id === selectedEvent.id ? {...event, checkedIn: true} : event
            ));
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
                                        marginBottom: '10px', borderRadius: '10px', cursor: 'pointer',
                                        backgroundColor: event.checkedIn ? 'lightgreen' : 'inherit'
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

                {/* Right section: Map */}
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

            <EventDetails open={open} onClose={handleClose} selectedEvent={selectedEvent}
                          handleConfirm={handleConfirm}/>
        </div>
    );
}
