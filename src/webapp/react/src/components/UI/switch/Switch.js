import React from "react";
import PropTypes from 'prop-types';
import {FormControlLabel, Switch} from "@material-ui/core";

export const CustomSwitch = ({label, handleSubscribe, subscribe}) => (
    <FormControlLabel
        label={label}
        checked={subscribe}
        onClick={handleSubscribe}
        control={<Switch name="checkedB" color="primary" />}
    />
)

CustomSwitch.propTypes = {
    label: PropTypes.string.isRequired,
    handleSubscribe: PropTypes.func,
    subscribe: PropTypes.bool.isRequired,
}