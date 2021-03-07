import React from "react";
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";

export const Modal = ({children, fullScreen, open, onClick, fullWidth}) => {
    return (
        <Dialog fullScreen={fullScreen} open={open} onClose={onClick} fullWidth={fullWidth}>
            {children}
        </Dialog>
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    fullScreen: PropTypes.bool,
    open: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    fullWidth: PropTypes.string,
};