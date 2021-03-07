import React from "react";
import classes from './FormControl.module.css';
import PropTypes from 'prop-types';

export const FormControl = ({children}) => {
    const handleSubmit = event => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className={classes.formControl}>
            {children}
        </form>
    )
}

FormControl.propTypes = {
    children: PropTypes.node.isRequired,
}