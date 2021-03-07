import React from "react";
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import classes from './Appbar.module.css';

export const Appbar = ({children}) => {
    return (
        <AppBar position="static" color="default" className={classes.appbar}>
            {children}
        </AppBar>
    )
}

AppBar.propTypes = {
    children: PropTypes.node.isRequired,
};