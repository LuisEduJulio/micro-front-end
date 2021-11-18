import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


export const Snackbars = ({ open, handleClose, message }) => {
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'top',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                style={{
                    marginTop: 20
                }}
            >
                <Alert
                    severity={message.type}

                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message.title}
                </Alert>
            </Snackbar>
        </div>
    );
}