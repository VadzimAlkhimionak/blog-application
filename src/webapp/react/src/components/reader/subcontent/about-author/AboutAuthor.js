import React from "react";
import PropTypes from 'prop-types';
import classes from './AboutAuthor.module.css';
import Typography from "@material-ui/core/Typography";
import {Textarea} from "../../../UI/textarea/Textarea";

export const AboutAuthor = ({biography, title}) => {
    return (
        <div className={classes.about}>
            <Typography align='center' variant="subtitle1">{title}</Typography>
            <Textarea value={biography} />
        </div>
    )
}

AboutAuthor.propTypes = {
    biography: PropTypes.string,
    title: PropTypes.string,
}