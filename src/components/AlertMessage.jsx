import React, {useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export default function AlertMessage({ open, onClose, message, color }) {

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={Slide}
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
        >
            <Alert
                onClose={onClose}
                severity={color}  // "success", "error", "info", "warning"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};