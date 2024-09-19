import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, Typography, Button, List } from '@mui/material';

export default function AdminPanel() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <Typography variant="h6" sx={{ padding: '16px', textAlign: 'center' }}>
                    Администрирование
                </Typography>
                <List>
                    <Button
                        component={Link}
                        to="/add_event"
                        color="primary"
                        variant="outlined"
                        sx={{ width: '100%', textAlign: 'left', justifyContent: 'flex-start', mb: 1 }}
                    >
                        Добавить событие
                    </Button>
                    <Button
                        component={Link}
                        to="/manage"
                        color="primary"
                        variant="outlined"
                        sx={{ width: '100%', textAlign: 'left', justifyContent: 'flex-start' }}
                    >
                        Управление событиями
                    </Button>
                </List>
            </Box>
        </Drawer>
    );
}
