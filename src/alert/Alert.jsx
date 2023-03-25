import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { Alert } from '@mui/material';

export default function AlertSnackbar({ open, onClose, message,severity}) {

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={onClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}
