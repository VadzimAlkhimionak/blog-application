import React from "react";
import PropTypes from 'prop-types';
import classes from './MainContent.module.css';

export const MainContent = ({children}) => {
    return (
        <div className={classes.mainContent}>
            {children}
        </div>
    )
}

MainContent.propTypes = {
    children: PropTypes.node.isRequired,
};