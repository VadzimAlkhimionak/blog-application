import React from "react";
import PropTypes from 'prop-types';
import classes from './Textarea.module.css';
import {TextareaAutosize} from "@material-ui/core";

export const Textarea = ({value, disabled, onChange, name, placeholder}) => {
    return (
        <TextareaAutosize
            rowsMax={7}
            rowsMin={7}
            value={value}
            className={classes.textarea}
            disabled={disabled}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
        />
    )
}

Textarea.defaultProps = {
    disabled: true,
    placeholder: ''
}

Textarea.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
}