import React from "react";
import PropTypes from 'prop-types';
import classes from './Title.module.css';

export const Title = ({text}) => (
    <div className={classes.title}>{text}</div>
)

Title.propTypes = {
    text: PropTypes.string.isRequired,
}