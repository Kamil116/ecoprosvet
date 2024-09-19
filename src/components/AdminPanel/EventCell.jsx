import {Button, TableCell, TableRow} from "@mui/material";
import React from "react";

export default function EventCell({name, date, id, handleEdit, handleDelete}) {
    return (
        <>
            <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(id)}
                        sx={{mr: 1}}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(id)}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
}
