import React from "react";
import PropTypes from 'prop-types';
import classes from './Subcontent.module.css';
import {AboutAuthor} from "./about-author/AboutAuthor";
import {Subscribers} from "./subscribers/Subscribers";

export const Subcontent = ({biography, countSubscribers}) => {
    return (
        <div className={classes.subcontent}>
            <AboutAuthor title='About author' biography={biography} />
            <Subscribers title='Subscriber count' value={countSubscribers} />
        </div>
    )
}

Subcontent.propTypes = {
    biography: PropTypes.string,
    countSubscribers: PropTypes.number,
}