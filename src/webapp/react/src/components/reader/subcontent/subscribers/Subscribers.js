import React from "react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";

export const Subscribers = ({title, value}) => {
    return (
        <div>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="h3" align='center'>{value}</Typography>
        </div>
    )
}

Subscribers.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
}