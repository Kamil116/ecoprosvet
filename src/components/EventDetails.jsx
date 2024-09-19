import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Chip} from "@mui/material";

export default function EventDetails(props) {
    const {selectedEvent, open, onClose, handleConfirm, handleCancel} = props;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography variant="h5" component="div">
                    {selectedEvent?.title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    {selectedEvent?.location}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {selectedEvent?.date}
                </Typography>
                <Chip
                    label={selectedEvent?.type || "Тип не указан"}
                    color="primary"
                    variant="outlined"
                    style={{margin: '10px 0'}}
                />
                <Typography variant="body2" paragraph>
                    {selectedEvent?.description}
                </Typography>
                {selectedEvent?.imageUrl && (
                    <img
                        src={selectedEvent.imageUrl}
                        alt={selectedEvent.title}
                        style={{width: '100%', height: 'auto', marginTop: '20px', borderRadius: '10px'}}
                    />
                )}
            </DialogContent>
            <DialogActions>
                {!selectedEvent?.checkedIn ? (
                    <Button onClick={handleConfirm} color="success" variant="contained">
                        Присоединиться
                    </Button>
                ) : (
                    <Button onClick={handleCancel} color="error" variant="contained">
                        Отменить участие
                    </Button>
                )}
                <Button onClick={onClose} color="secondary" variant="outlined">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
}
