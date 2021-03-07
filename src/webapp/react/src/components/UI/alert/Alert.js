import React from "react";
import classes from './Alert.module.css';
import PropTypes from 'prop-types';
import MuiAlert from "@material-ui/lab/Alert";

export const Alert = ({message, onClick, severity}) => (
    <MuiAlert elevation={6} variant='filled' onClose={onClick} severity={severity} className={classes.alert}>
        {message}
    </MuiAlert>
)

Alert.defaultProp = {
    severity: 'success'
}

Alert.propTypes = {
    message: PropTypes.string,
    onClick: PropTypes.func,
    severity: PropTypes.string,
}