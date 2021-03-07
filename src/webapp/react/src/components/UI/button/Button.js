import React from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";

export const Btn = ({color, onClick, title, disabled, variant, fullWidth}) => (
    <Button
        variant={variant}
        color={color}
        type='submit'
        fullWidth={fullWidth}
        onClick={onClick}
        disabled={disabled}
    >
        {title}
    </Button>
)

Btn.defaultProps = {
    variant: "contained",
    fullWidth: true,
    color: "primary",
    disabled: false
}

Btn.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}