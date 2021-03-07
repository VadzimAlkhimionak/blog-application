import React from "react";
import PropTypes from 'prop-types';
import {TextField} from "@material-ui/core";

export const Input = ({label, name, onChange, error, type, disabled, value}) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            type={type}
            fullWidth={true}
            name={name}
            onChange={onChange}
            helperText={error[name] && error[name]}
            error={Boolean(error[name])}
            disabled={disabled}
            value={value}
            color='primary'
        />
    )
}

Input.defaultProps = {
    error: false,
    type: 'text',
    disabled: false,
}

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
}

