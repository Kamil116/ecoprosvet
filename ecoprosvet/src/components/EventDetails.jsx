import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

export default function EventDetails(props) {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>{props.selectedEvent?.title}</DialogTitle>
            <DialogContent>
                <Typography variant="h6">{props.selectedEvent?.location}</Typography>
                <Typography variant="body1">{props.selectedEvent?.date}</Typography>
                <Typography variant="body2" paragraph>{props.selectedEvent?.description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={props.handleConfirm} color="primary">
                    Присоединиться
                </Button>
            </DialogActions>
        </Dialog>
    );
}