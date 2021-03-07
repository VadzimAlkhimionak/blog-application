import React from "react";
import PropTypes from 'prop-types';
import {Fab} from "@material-ui/core";

export const Like = ({color, disabled, onClick, children}) => {
    return (
        <Fab color={color}
             size='small'
             variant='round'
             disabled={disabled}
             onClick={onClick}
        >
            {children}
        </Fab>
    )
}

Like.defaultProps = {
    color: "primary",
    disabled: false,
}

Like.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
}