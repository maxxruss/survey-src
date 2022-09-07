import React, { useState } from "react"
import { Grid, Button, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type PropTypes = {
    open: boolean;
    title: string;
    text: string;
    onConfirm: () => {};
    onClose: () => void;
}

const ConfirmDialog = ({ open, title, text, onConfirm, onClose }: PropTypes) => {
    // const [open, setOpen] = useState(show)

    function execute() {
        onClose()
        onConfirm()
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={() => onClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()}>Нет</Button>
                    <Button onClick={() => execute()} autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDialog