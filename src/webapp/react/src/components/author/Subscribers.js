import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import PeopleIcon from '@material-ui/icons/People';

export const Subscribers = ({subscribers}) => {
    return (
        <Chip
            icon={<PeopleIcon />}
            label={`Subscribers: ${subscribers}`}
            color="secondary"
        />
    );
}

Subscribers.propTypes = {
    subscribers: PropTypes.number.isRequired,
};
