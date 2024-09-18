import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";

import './EventMap.css';

const events = [
    {
        id: 1,
        title: 'Событие 1',
        date: '2024-10-01',
        location: 'Парк Горького, Москва',
        coordinates: [37.6017, 55.7158],
    },
    {
        id: 2,
        title: 'Событие 2',
        date: '2024-10-05',
        location: 'Московский государственный университет',
        coordinates: [37.5408, 55.7033],
    },
];

const geoUrl = 'https://raw.githubusercontent.com/zarkzork/russia-topojson/master/moscow.json';

export default function EventMap() {
    let navigate = useNavigate();
    const handleMarkerClick = (event) => {
        console.log("clicked:", event);
    };

    const handleEventClick = (event) => {
        navigate(`/event_details/${event.id}`);
        console.log("clicked:", event);
    };

    return (
        <Grid container spacing={2} style={{ height: '100vh', padding: '20px' }}>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
                    <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                        ЭКОМЕРОПРИЯТИЯ МОСКВЫ
                    </Typography>
                    <List>
                        {events.map((event) => (
                            <ListItem
                                key={event.id}
                                button
                                onClick={() => handleEventClick(event)}
                                style={{ marginBottom: '10px', borderRadius: '10px', cursor: 'pointer' }}
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
                <Paper elevation={3} style={{ padding: '20px', height: '100%', overflow: 'hidden' }}>
                    <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                        КАРТА СОБЫТИЙ
                    </Typography>
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 30000,
                            center: [37.62, 55.75],
                        }}
                        style={{ width: '100%', height: '100%' }}
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
                                <circle r={6} fill="red" stroke="gray" strokeWidth={2} />
                            </Marker>
                        ))}
                    </ComposableMap>
                </Paper>
            </Grid>
        </Grid>
    );
}
