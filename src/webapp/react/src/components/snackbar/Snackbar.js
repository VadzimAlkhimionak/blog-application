import React, {useState} from "react";
import PropTypes from 'prop-types';
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "../UI/alert/Alert";

export const CustomizedSnackbar = ({message, severity}) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert message={message} onClick={handleClose} severity={severity} />
        </Snackbar>
    );
}

CustomizedSnackbar.propTypes = {
    message: PropTypes.string.isRequired,
    severity: PropTypes.string,
}